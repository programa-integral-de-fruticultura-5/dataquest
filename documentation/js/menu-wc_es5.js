'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(fn) { try { return Function.toString.call(fn).indexOf("[native code]") !== -1; } catch (e) { return typeof fn === "function"; } }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
customElements.define('compodoc-menu', /*#__PURE__*/function (_HTMLElement) {
  _inherits(_class, _HTMLElement);
  function _class() {
    var _this;
    _classCallCheck(this, _class);
    _this = _callSuper(this, _class);
    _this.isNormalMode = _this.getAttribute('mode') === 'normal';
    return _this;
  }
  _createClass(_class, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render(this.isNormalMode);
    }
  }, {
    key: "render",
    value: function render(isNormalMode) {
      var tp = lithtml.html("\n        <nav>\n            <ul class=\"list\">\n                <li class=\"title\">\n                    <a href=\"index.html\" data-type=\"index-link\">pif5_dataquest documentation</a>\n                </li>\n\n                <li class=\"divider\"></li>\n                ".concat(isNormalMode ? "<div id=\"book-search-input\" role=\"search\"><input type=\"text\" placeholder=\"Type to search\"></div>" : '', "\n                <li class=\"chapter\">\n                    <a data-type=\"chapter-link\" href=\"index.html\"><span class=\"icon ion-ios-home\"></span>Getting started</a>\n                    <ul class=\"links\">\n                        <li class=\"link\">\n                            <a href=\"index.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-keypad\"></span>Overview\n                            </a>\n                        </li>\n                                <li class=\"link\">\n                                    <a href=\"dependencies.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-list\"></span>Dependencies\n                                    </a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"properties.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-apps\"></span>Properties\n                                    </a>\n                                </li>\n                    </ul>\n                </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#components-links"' : 'data-bs-target="#xs-components-links"', ">\n                            <span class=\"icon ion-md-cog\"></span>\n                            <span>Components</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="components-links"' : 'id="xs-components-links"', ">\n                            <li class=\"link\">\n                                <a href=\"components/AppComponent.html\" data-type=\"entity-link\" >AppComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/AutocompleteComponent.html\" data-type=\"entity-link\" >AutocompleteComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/DataquestHeaderComponent.html\" data-type=\"entity-link\" >DataquestHeaderComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/DateDataTypeComponent.html\" data-type=\"entity-link\" >DateDataTypeComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/DetailedFormComponent.html\" data-type=\"entity-link\" >DetailedFormComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/DetailPage.html\" data-type=\"entity-link\" >DetailPage</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/DraftsPage.html\" data-type=\"entity-link\" >DraftsPage</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/DrawingPadDataTypeComponent.html\" data-type=\"entity-link\" >DrawingPadDataTypeComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/EmailDataTypeComponent.html\" data-type=\"entity-link\" >EmailDataTypeComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/FormListComponent.html\" data-type=\"entity-link\" >FormListComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/FormsPage.html\" data-type=\"entity-link\" >FormsPage</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/HomePage.html\" data-type=\"entity-link\" >HomePage</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/LoginPage.html\" data-type=\"entity-link\" >LoginPage</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/MoneyDataTypeComponent.html\" data-type=\"entity-link\" >MoneyDataTypeComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/MonthDataTypeComponent.html\" data-type=\"entity-link\" >MonthDataTypeComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/MultipleComponent.html\" data-type=\"entity-link\" >MultipleComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/NumberDataTypeComponent.html\" data-type=\"entity-link\" >NumberDataTypeComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/OpenComponent.html\" data-type=\"entity-link\" >OpenComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/PercentageDataTypeComponent.html\" data-type=\"entity-link\" >PercentageDataTypeComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/PhoneDataTypeComponent.html\" data-type=\"entity-link\" >PhoneDataTypeComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/PhotoDataTypeComponent.html\" data-type=\"entity-link\" >PhotoDataTypeComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/QuestionComponent.html\" data-type=\"entity-link\" >QuestionComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/SurveysPage.html\" data-type=\"entity-link\" >SurveysPage</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/TableComponent.html\" data-type=\"entity-link\" >TableComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/TextAreaDataTypeComponent.html\" data-type=\"entity-link\" >TextAreaDataTypeComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/TextDataTypeComponent.html\" data-type=\"entity-link\" >TextDataTypeComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/TypeaheadComponent.html\" data-type=\"entity-link\" >TypeaheadComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/TypeComponent.html\" data-type=\"entity-link\" >TypeComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/UniqueComponent.html\" data-type=\"entity-link\" >UniqueComponent</a>\n                            </li>\n                        </ul>\n                    </li>\n                        <li class=\"chapter\">\n                            <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#injectables-links"' : 'data-bs-target="#xs-injectables-links"', ">\n                                <span class=\"icon ion-md-arrow-round-down\"></span>\n                                <span>Injectables</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                            <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"', ">\n                                <li class=\"link\">\n                                    <a href=\"injectables/AnswerRelationService.html\" data-type=\"entity-link\" >AnswerRelationService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/ApiService.html\" data-type=\"entity-link\" >ApiService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/AssociationService.html\" data-type=\"entity-link\" >AssociationService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/AuthGuard.html\" data-type=\"entity-link\" >AuthGuard</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/AuthService.html\" data-type=\"entity-link\" >AuthService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/DetailedFormService.html\" data-type=\"entity-link\" >DetailedFormService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/DraftService.html\" data-type=\"entity-link\" >DraftService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/FormService.html\" data-type=\"entity-link\" >FormService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/OfflineManagerService.html\" data-type=\"entity-link\" >OfflineManagerService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/PhotoService.html\" data-type=\"entity-link\" >PhotoService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/ProducerService.html\" data-type=\"entity-link\" >ProducerService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/QuestionControlService.html\" data-type=\"entity-link\" >QuestionControlService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/QuestionService.html\" data-type=\"entity-link\" >QuestionService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/SecureInnerPagesGuard.html\" data-type=\"entity-link\" >SecureInnerPagesGuard</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/StorageService.html\" data-type=\"entity-link\" >StorageService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/SurveyService.html\" data-type=\"entity-link\" >SurveyService</a>\n                                </li>\n                            </ul>\n                        </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#interfaces-links"' : 'data-bs-target="#xs-interfaces-links"', ">\n                            <span class=\"icon ion-md-information-circle-outline\"></span>\n                            <span>Interfaces</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"', ">\n                            <li class=\"link\">\n                                <a href=\"interfaces/Answer.html\" data-type=\"entity-link\" >Answer</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/AnswerPivot.html\" data-type=\"entity-link\" >AnswerPivot</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/AnswerRelation.html\" data-type=\"entity-link\" >AnswerRelation</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Association.html\" data-type=\"entity-link\" >Association</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/AuthManagement.html\" data-type=\"entity-link\" >AuthManagement</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Form.html\" data-type=\"entity-link\" >Form</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Producer.html\" data-type=\"entity-link\" >Producer</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Question.html\" data-type=\"entity-link\" >Question</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/QuestionCategory.html\" data-type=\"entity-link\" >QuestionCategory</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/StoredRequest.html\" data-type=\"entity-link\" >StoredRequest</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/User.html\" data-type=\"entity-link\" >User</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#miscellaneous-links"' : 'data-bs-target="#xs-miscellaneous-links"', ">\n                            <span class=\"icon ion-ios-cube\"></span>\n                            <span>Miscellaneous</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"', ">\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/functions.html\" data-type=\"entity-link\">Functions</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/typealiases.html\" data-type=\"entity-link\">Type aliases</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/variables.html\" data-type=\"entity-link\">Variables</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <a data-type=\"chapter-link\" href=\"coverage.html\"><span class=\"icon ion-ios-stats\"></span>Documentation coverage</a>\n                    </li>\n                    <li class=\"divider\"></li>\n                    <li class=\"copyright\">\n                        Documentation generated using <a href=\"https://compodoc.app/\" target=\"_blank\" rel=\"noopener noreferrer\">\n                            <img data-src=\"images/compodoc-vectorise.png\" class=\"img-responsive\" data-type=\"compodoc-logo\">\n                        </a>\n                    </li>\n            </ul>\n        </nav>\n        "));
      this.innerHTML = tp.strings;
    }
  }]);
  return _class;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));