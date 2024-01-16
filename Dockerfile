# Pull base image
FROM node:18 AS base

# Install OpenJDK 17
RUN apt-get update && \
    apt-get install -y openjdk-17-jdk && \
    rm -rf /var/lib/apt/lists/*

# Set Java environment variables
ENV JAVA_HOME="/usr/lib/jvm/java-17-openjdk-amd64"
ENV PATH="$JAVA_HOME/bin:$PATH"

# Print Java version for verification
RUN java --version

# Stage for building and installing SDK (replace with your SDK installation steps)
FROM base AS sdk

# Install SDK (replace with your SDK installation steps)
RUN apt-get update && \
    apt-get install -y android-sdk && \
    rm -rf /var/lib/apt/lists/*

# Set Android environment variables
ENV ANDROID_HOME="/usr/lib/android-sdk"
ENV PATH="$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME/platform-tools:$PATH"

# Download sdkmanager
RUN cd $ANDROID_HOME && \
    wget -q https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip && \
    unzip -q commandlinetools-linux-11076708_latest.zip && \
    cd cmdline-tools && \
    mkdir latest && \
    mv NOTICE.txt bin lib source.properties latest && \
    rm ../commandlinetools-linux-11076708_latest.zip

ENV PATH="$ANDROID_HOME/cmdline-tools/latest/bin:$PATH"

# Install Android SDK components
RUN yes | sdkmanager --licenses && \
    sdkmanager --update && \
    sdkmanager "build-tools;30.0.3" "platforms;android-33"

FROM sdk AS final

# Install app dependencies
COPY package*.json ./

RUN npm install
RUN npm install -g @ionic/cli

# Create app directory
WORKDIR /www/app

# Bundle app source
COPY . /www/app/

# Expose port 8100
EXPOSE 8100

# Entry point
# ENTRYPOINT ["ionic"]

# Run the app
# CMD ["serve", "--external", "--no-open"]