angular
.module('ClientApp', ['ngMaterial', 'ngAnimate', 'toastr', 'ui.router', 'gettext', 'ngResource',
'LocalStorageModule', 'md.data.table', 'ncy-angular-breadcrumb', 'ngFileUpload',
'ui.tree', 'ngMessages', 'angularTrix', 'AnrModule', 'ng-sortable'])
.config(['$mdThemingProvider', '$stateProvider', '$urlRouterProvider', '$resourceProvider',
'localStorageServiceProvider', '$httpProvider', '$breadcrumbProvider', '$provide', 'gettext', '$mdAriaProvider',
'$mdDateLocaleProvider', '$locationProvider','$sceDelegateProvider',
function ($mdThemingProvider, $stateProvider, $urlRouterProvider, $resourceProvider, localStorageServiceProvider,
  $httpProvider, $breadcrumbProvider, $provide, gettext, $mdAriaProvider, $mdDateLocaleProvider, $locationProvider,
  $sceDelegateProvider) {

    // Store the state provider to be allow controllers to inject their routes
    window.$stateProvider = $stateProvider;

    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      // Allow loading from our assets domain.  Notice the difference between * and **.
      'https://objects.monarc.lu/**'
    ]);
    $mdThemingProvider.definePalette('monarcfo',{
      '50':  '#BCBEC0',
      '100': '#BCBEC0',
      '200': '#939598',
      '300': '#78909C',
      '400': '#627D8C',
      '500': '#308AA1',
      '600': '#59717C',
      '700': '#6D6F71',
      '800': '#231F20',
      '900': '#231F20',
      'A100': '#78909C',
      'A200': '#627D8C',
      'A400': '#59717C',
      'A700': '#231F20',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': '50 100 200'
    });

    $mdThemingProvider.definePalette('monarcfoAccent', {
      '50':  '#BCBEC0',
      '100': '#939598',
      '200': '#78909C',
      '300': '#627D8C',
      '400': '#59717C',
      '500': '#627D8C',
      '600': '#59717C',
      '700': '#6D6F71',
      '800': '#231F20',
      '900': '#231F20',
      'A100': '#78909C',
      'A200': '#308AA1',
      'A400': '#59717C',
      'A700': '#231F20',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': '50 100'
    });

    $mdThemingProvider.definePalette('monarcfoBg', {
      '50':  '#FFFFFF',
      '100': '#FFFFFF',
      '200': '#BCBEC0',
      '300': '#939598',
      '400': '#78909C',
      '500': '#627D8C',
      '600': '#59717C',
      '700': '#6D6F71',
      '800': '#231F20',
      '900': '#231F20',
      'A100': '#FFFFFF',
      'A200': '#BCBEC0',
      'A400': '#939598',
      'A700': '#6D6F71',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': '50 100 200 300 A100 A200 A400'
    });



    $mdThemingProvider.theme('default')
    .primaryPalette('monarcfo')
    .accentPalette('monarcfoAccent')
    .dark();

    $mdThemingProvider.theme('light')
    .backgroundPalette('monarcfoBg')
    .primaryPalette('monarcfo')
    .accentPalette('monarcfoAccent');

    $urlRouterProvider.otherwise('/');

    // Globally disables all ARIA warnings.
    $mdAriaProvider.disableWarnings();

    // Date pickers
    $mdDateLocaleProvider.months = [
      gettext('January'),
      gettext('February'),
      gettext('March'),
      gettext('April'),
      gettext('May'),
      gettext('June'),
      gettext('July'),
      gettext('August'),
      gettext('September'),
      gettext('October'),
      gettext('November'),
      gettext('December')
    ];
    $mdDateLocaleProvider.shortMonths = [
      gettext('Jan'),
      gettext('Feb'),
      gettext('Mar'),
      gettext('Apr'),
      gettext('May'),
      gettext('Jun'),
      gettext('Jul'),
      gettext('Aug'),
      gettext('Sep'),
      gettext('Oct'),
      gettext('Nov'),
      gettext('Dec')
    ];
    $mdDateLocaleProvider.days = [
      gettext('Monday'),
      gettext('Tuesday'),
      gettext('Wednesday'),
      gettext('Thursday'),
      gettext('Friday'),
      gettext('Saturday'),
      gettext('Sunday')
    ];
    $mdDateLocaleProvider.shortDays = [
      gettext('Mon'),
      gettext('Tue'),
      gettext('Wed'),
      gettext('Thu'),
      gettext('Fri'),
      gettext('Sat'),
      gettext('Sun')
    ];
    $mdDateLocaleProvider.firstDayOfWeek = 1;
    $mdDateLocaleProvider.formatDate = function (date) {
      var m = moment(date);
      return m.isValid() ? m.format('DD/MM/Y') : ''
    };
    $mdDateLocaleProvider.parseDate = function (dateString) {
      var m = moment(dateString, 'DD/MM/Y', true);
      return m.isValid() ? m.toDate() : new Date(NaN);
    }

    localStorageServiceProvider
    .setStorageType('localStorage');

    $breadcrumbProvider.setOptions({
      templateUrl: 'views/_breadcrumb.html'
    });

    $locationProvider.hashPrefix('');

    $stateProvider.state('login', {
      url: "/",
      views: {
        "main": {templateUrl: "views/login.html"}
      }
    }).state('passwordforgotten', {
      url: "/passwordforgotten/:token",
      views: {
        "main": {templateUrl: "views/passwordforgotten.html"}
      }
    }).state('main', {
      url: "/client",
      views: {
        "main": {
          templateUrl: "views/client.index.html"
        }
      },
      ncyBreadcrumb: {
        label: gettext('Home')
      },
    }).state('main.account', {
      url: "/account",
      views: {
        "main@main": {templateUrl: "views/client.account.html"}
      },
      ncyBreadcrumb: {
        label: gettext('Account')
      }
    }).state('main.admin', {
      url: "/admin",
      ncyBreadcrumb: {
        label: gettext('Administration')
      }
    }).state('main.admin.accesslog', {
      url: "/accesslog",
      views: {
        "main@main": {templateUrl: "views/client.admin.accesslog.html"}
      },
      ncyBreadcrumb: {
        label: gettext('Access log')
      }
    }).state('main.admin.settings', {
      url: "/settings",
      views: {
        "main@main": {templateUrl: "views/client.admin.settings.html"}
      },
      ncyBreadcrumb: {
        label: gettext('General settings')
      }
    }).state('main.admin.deliveries_models', {
      url: "/deliveriesmodels",
      views: {
        "main@main": {templateUrl: "views/client.admin.deliveriesmodels.html"}
      },
      ncyBreadcrumb: {
        label: gettext('Deliverable templates')
      }
    }).state('main.admin.users', {
      url: "/users",
      views: {
        "main@main": {templateUrl: "views/client.admin.users.html"}
      },
      ncyBreadcrumb: {
        label: gettext('Users')
      }
    }).state('main.project', {
      url: "/project",
      views: {
        "main@main": {templateUrl: "views/client.project.html"}
      },
      ncyBreadcrumb: {
        skip: true,
        label: gettext('Risk analyses')
      },
      onEnter: function($timeout, $state){
        if ($state.current.name == 'main.project') {
          $state.go('main.project');
        }
      }
    }).state('main.project.anr', {
      url: "/:modelId/anr",
      views: {
        "main@main": {templateUrl: "views/anr/anr.layout.html"},
        'anr@main.project.anr': {templateUrl: 'views/anr/anr.home.html'}
      },
      ncyBreadcrumb: {
        label: '{{ $scope.model.anr ? $scope.model.anr.label : $parent.model.anr.label }}'
      }
    }).state('main.project.anr.dashboard', {
      url: "/dashboard",
      views: {
        'anr@main.project.anr': {templateUrl: 'views/anr/anr.home.html'}
      },
      ncyBreadcrumb: {
        label: gettext('Dashboard')
      }
    }).state('main.project.anr.scales',{
      url: "/scales",
      views: {
        'anr@main.project.anr': {templateUrl: 'views/anr/anr.home.html'}
      },
      ncyBreadcrumb: {
        label: gettext('Evaluation scales')
      }
    }).state('main.project.anr.knowledge',{
      url: "/knowledge",
      views: {
        'anr@main.project.anr': {templateUrl: 'views/anr/anr.home.html'}
      },
      ncyBreadcrumb: {
        label: gettext('Knowledge base')
      }
    }).state('main.project.anr.risk',{
      url: "/risk/:riskId",
      views: {
        'anr@main.project.anr': {templateUrl: 'views/anr/anr.home.html'}
      },
      ncyBreadcrumb: {
        label: gettext('Risk sheet')
      }
    }).state('main.project.anr.riskop',{
      url: "/riskop/:riskopId",
      views: {
        'anr@main.project.anr': {templateUrl: 'views/anr/anr.home.html'}
      },
      ncyBreadcrumb: {
        label: gettext('Risk sheet')
      }
    }).state('main.project.anr.object', {
      url: '/object/:objectId',
      views: {
        'anr@main.project.anr': {templateUrl: 'views/anr/object.html'}
      },
      ncyBreadcrumb: {
        label: gettext('Library')
      }
    }).state('main.project.anr.instance', {
      url: '/inst/:instId',
      views: {
        'anr@main.project.anr': {templateUrl: 'views/anr/anr.instance.html'}
      },
      ncyBreadcrumb: {
        skip: true,
        label: '{{_langField($scope.instance,\'name\')}}'
      }
    }).state('main.project.anr.instance.risk',{
      url: "/risk/:riskId",
      views: {
        'anr@main.project.anr': {templateUrl: 'views/anr/anr.instance.html'}
      },
      ncyBreadcrumb: {
        label: gettext('Risk sheet')
      }
    }).state('main.project.anr.instance.riskop',{
      url: "/riskop/:riskopId",
      views: {
        'anr@main.project.anr': {templateUrl: 'views/anr/anr.instance.html'}
      },
      ncyBreadcrumb: {
        label: gettext('Risk sheet')
      }
    }).state('main.project.anr.risksplan', {
      url: '/risksplan',
      views: {
        'anr@main.project.anr': {templateUrl: 'views/anr/anr.risksplan.html'}
      },
      ncyBreadcrumb: {
        label: gettext('Implementation of the risk treatment plan')
      }
    }).state('main.project.anr.risksplan.history', {
      url: '/history',
      views: {
        'anr@main.project.anr': {templateUrl: 'views/anr/anr.risksplan.history.html'}
      },
      ncyBreadcrumb: {
        label: gettext('Implementation history')
      }
    }).state('main.project.anr.risksplan.sheet', {
      url: '/:recId',
      views: {
        'anr@main.project.anr': {templateUrl: 'views/anr/anr.risksplan.sheet.html'}
      },
      ncyBreadcrumb: {
        label: gettext('Recommendation')
      }

    }).state('main.project.anr.ropa', {
      url: '/ropa',
      views: {
        'anr@main.project.anr': {templateUrl: 'views/anr/anr.ropa.html'}
      },
      ncyBreadcrumb: {
        label: gettext('Record of processing activities')
      }
    }).state('main.project.anr.soa', {
      url: '/soa',
      views: {
        'anr@main.project.anr': {templateUrl: 'views/anr/anr.soa.html'}
      },
      ncyBreadcrumb: {
        label: gettext('Statement of applicability')
      }
    }).state('main.project.anr.soa.sheet', {
      url: '/control',
      data: null,
      views: {
        'anr@main.project.anr': {templateUrl: 'views/anr/anr.soa.sheet.html'}
      },
      ncyBreadcrumb: {
        label: gettext('Risks')
      },
    });

    $provide.factory('monarcHttpInter', ['$injector', function ($injector) {
      return {
        'request': function (config) {
          // UserService depends on $http, which causes a circular dependency inside a $http interceptor
          var UserService = $injector.get('UserService');
          var $http = $injector.get('$http');

          if (!UserService.isAuthenticated()) {
            UserService.reauthenticate();
          }


          if (UserService.isAuthenticated()) {
            config.headers.token = UserService.getToken();
          }

          return config;
        },

        'responseError': function (response) {
          var ErrorService = $injector.get('ErrorService');
          var gettextCatalog = $injector.get('gettextCatalog');

          function translateKnownErrorMessage(message) {
            if (!message || typeof message !== 'string') {
              return message;
            }

            function translateScaleType(scaleType) {
              const scaleTypes = {
                'confidentiality': gettext('confidentiality'),
                'integrity': gettext('integrity'),
                'availability': gettext('availability'),
                'threat probability': gettext('threat probability'),
                'vulnerability qualification': gettext('vulnerability qualification')
              };

              return scaleTypes[scaleType]
                ? gettextCatalog.getString(scaleTypes[scaleType])
                : scaleType;
            }

            message = message.replace(
              /The value (-?\d+) should be between one of \[([^\]]+)\]/g,
              function (match, value, allowedValues) {
                return gettextCatalog.getString(
                  gettext('The value {{value}} should be between one of [{{allowedValues}}]'),
                  { value: value, allowedValues: allowedValues }
                );
              }
            );

            message = message.replace(
              /The value (-?\d+) should be between (-?\d+) and (-?\d+)\./g,
              function (match, value, min, max) {
                return gettextCatalog.getString(
                  gettext('The value {{value}} should be between {{min}} and {{max}}.'),
                  { value: value, min: min, max: max }
                );
              }
            );

            message = message.replace(
              /The value (-?\d+) of "([^"]+)" is out of bounds\. min: (-?\d+) max: (-?\d+)\./g,
              function (match, value, scaleType, min, max) {
                return gettextCatalog.getString(
                  gettext('The value {{value}} of "{{scaleType}}" is out of bounds. min: {{min}} max: {{max}}.'),
                  { value: value, scaleType: translateScaleType(scaleType), min: min, max: max }
                );
              }
            );

            message = message.replace(
              /The value for reduction amount \((-?\d+)\) is not valid \(min (-?\d+)\)\./g,
              function (match, value, min) {
                return gettextCatalog.getString(
                  gettext('The value for reduction amount ({{value}}) is not valid (min {{min}}).'),
                  { value: value, min: min }
                );
              }
            );

            message = message.replace(
              /The scale index "(-?\d+)" is out of bounds\./g,
              function (match, index) {
                return gettextCatalog.getString(
                  gettext('The scale index "{{index}}" is out of bounds.'),
                  { index: index }
                );
              }
            );

            message = message.replace(
              /An error occurred during the file upload\. Error code: (\d+)/g,
              function (match, code) {
                return gettextCatalog.getString(
                  gettext('An error occurred during the file upload. Error code: {{code}}'),
                  { code: code }
                );
              }
            );

            message = message.replace(
              /The files upload directory "([^"]+)" is doesn't exist or or not writable/g,
              function (match, directory) {
                return gettextCatalog.getString(
                  gettext('The files upload directory "{{directory}}" is doesn\'t exist or or not writable'),
                  { directory: directory }
                );
              }
            );

            message = message.replace(
              /Param "([^"]+)" is not allowed to have value "([^"]+)"\./g,
              function (match, field, value) {
                return gettextCatalog.getString(
                  gettext('Param "{{field}}" is not allowed to have value "{{value}}".'),
                  { field: field, value: value }
                );
              }
            );

            message = message.replace(
              /The object is not linked to the anr ID "(\d+)"/g,
              function (match, anrId) {
                return gettextCatalog.getString(
                  gettext('The object is not linked to the anr ID "{{anrId}}"'),
                  { anrId: anrId }
                );
              }
            );

            message = message.replace(
              /The current analysis language "([^"]+)" should be the same as importing one "([^"]+)"/g,
              function (match, currentLanguage, importingLanguage) {
                return gettextCatalog.getString(
                  gettext('The current analysis language "{{currentLanguage}}" should be the same as importing one "{{importingLanguage}}"'),
                  { currentLanguage: currentLanguage, importingLanguage: importingLanguage }
                );
              }
            );

            message = message.replace(
              /Model not found "([^"]+)"/g,
              function (match, model) {
                return gettextCatalog.getString(
                  gettext('Model not found "{{model}}"'),
                  { model: model }
                );
              }
            );

            message = message.replace(
              /Model path not found: (.+)/g,
              function (match, modelPath) {
                return gettextCatalog.getString(
                  gettext('Model path not found: {{modelPath}}'),
                  { modelPath: modelPath }
                );
              }
            );

            message = message.replace(
              /Generated file is not found: (.+)/g,
              function (match, filePath) {
                return gettextCatalog.getString(
                  gettext('Generated file is not found: {{filePath}}'),
                  { filePath: filePath }
                );
              }
            );

            message = message.replace(
              /Password validation errors: \[ (.+) \]\./g,
              function (match, errors) {
                return gettextCatalog.getString(
                  gettext('Password validation errors: [ {{errors}} ].'),
                  { errors: errors }
                );
              }
            );

            message = message.replace(
              /Query params validation errors: \[ (.+) \]\./g,
              function (match, errors) {
                return gettextCatalog.getString(
                  gettext('Query params validation errors: [ {{errors}} ].'),
                  { errors: errors }
                );
              }
            );

            message = message.replace(
              /Scale of type "([^"]+)" does not exist with anr ID: "([^"]+)"/g,
              function (match, type, anrId) {
                return gettextCatalog.getString(
                  gettext('Scale of type "{{type}}" does not exist with anr ID: "{{anrId}}"'),
                  { type: type, anrId: anrId }
                );
              }
            );

            message = message.replace(
              /User with email "([^"]+)" does not exist/g,
              function (match, email) {
                return gettextCatalog.getString(
                  gettext('User with email "{{email}}" does not exist'),
                  { email: email }
                );
              }
            );

            message = message.replace(
              /Entity of type ["']([^"']+)["'], with ID ([^ ]+) was not found in analysis ID (\d+)/g,
              function (match, entityType, id, anrId) {
                return gettextCatalog.getString(
                  gettext('Entity of type "{{entityType}}", with ID {{id}} was not found in analysis ID {{anrId}}'),
                  { entityType: entityType, id: id, anrId: anrId }
                );
              }
            );

            message = message.replace(
              /Entity of type ["']([^"']+)["'] for IDs (.+) was not found/g,
              function (match, entityType, ids) {
                return gettextCatalog.getString(
                  gettext("Entity of type '{{entityType}}' for IDs {{ids}} was not found"),
                  { entityType: entityType, ids: ids }
                );
              }
            );

            message = message.replace(
              /One of the CIA criteria is required to be set for the threat "([^"]+)"\./g,
              function (match, threat) {
                return gettextCatalog.getString(
                  gettext('One of the CIA criteria is required to be set for the threat "{{threat}}".'),
                  { threat: threat }
                );
              }
            );

            message = message.replace(
              /The cron task name "([^"]+)" is not supported\./g,
              function (match, name) {
                return gettextCatalog.getString(
                  gettext('The cron task name "{{name}}" is not supported.'),
                  { name: name }
                );
              }
            );

            message = message.replace(
              /Stats type ([^ ]+) is not supported!/g,
              function (match, type) {
                return gettextCatalog.getString(
                  gettext('Stats type {{type}} is not supported!'),
                  { type: type }
                );
              }
            );

            message = message.replace(
              /Directory "([^"]+)" was not created/g,
              function (match, directory) {
                return gettextCatalog.getString(
                  gettext('Directory "{{directory}}" was not created'),
                  { directory: directory }
                );
              }
            );

            message = message.replace(
              /The declared class "([^"]+)" can't be created/g,
              function (match, className) {
                return gettextCatalog.getString(
                  gettext("The declared class \"{{className}}\" can't be created"),
                  { className: className }
                );
              }
            );

            message = message.replace(
              /The declared service class "([^"]+)" can't be created/g,
              function (match, className) {
                return gettextCatalog.getString(
                  gettext("The declared service class \"{{className}}\" can't be created"),
                  { className: className }
                );
              }
            );

            message = message.replace(
              /Table's entity class name "([^"]+)" and entity class name "([^"]+)" should be equal\./g,
              function (match, tableClassName, entityClassName) {
                return gettextCatalog.getString(
                  gettext("Table's entity class name \"{{tableClassName}}\" and entity class name \"{{entityClassName}}\" should be equal."),
                  { tableClassName: tableClassName, entityClassName: entityClassName }
                );
              }
            );

            message = message.replace(
              /The property "recommendationTable" should be defined in the class "([^"]+)" to be able to use the trait "([^"]+)"/g,
              function (match, className, traitName) {
                return gettextCatalog.getString(
                  gettext('The property "recommendationTable" should be defined in the class "{{className}}" to be able to use the trait "{{traitName}}"'),
                  { className: className, traitName: traitName }
                );
              }
            );

            return gettextCatalog.getString(message);
          }

          function translateValidationField(field) {
            const fieldLabels = {
              code: gettext('Code'),
              label: gettext('Label'),
              description: gettext('Description'),
              proxyAlias: gettext('proxyAlias'),
              ipAddress: gettext('ipAddress')
            };

            if (/^label\d+$/.test(field)) {
              return gettextCatalog.getString(gettext('Label'));
            }
            if (/^description\d+$/.test(field)) {
              return gettextCatalog.getString(gettext('Description'));
            }

            if (fieldLabels[field]) {
              return gettextCatalog.getString(fieldLabels[field]);
            }

            return gettextCatalog.getString(field.replace(/([a-z])([A-Z])/g, '$1 $2'));
          }

          if (response.status === 400) {
            for (i = 0; i < response.data.errors.length; ++i) {
              const messages = response.data.errors[i];
              let validationErrors = '';
              if (messages.hasOwnProperty('row')) {
                validationErrors += gettextCatalog.getString(gettext('Validation errors in row')) + ' #'
                  + messages.row + "\r\n";
              } else {
                validationErrors += gettextCatalog.getString(gettext('Input data validation errors:')) + "\r\n";
              }
              if (messages.hasOwnProperty('validationErrors')) {
                for (const [field, fieldMessage] of Object.entries(messages.validationErrors)) {
                  validationErrors += '[' + translateValidationField(field) + "] :\r\n";
                  for (const message of fieldMessage) {
                    validationErrors += '- ' + translateKnownErrorMessage(message) + "\r\n";
                  }
                }
              }
              ErrorService.notifyError(validationErrors);
            }
          } else if (response.status === 401) {
            const state = $injector.get('$state');
            if (state.current.name !== 'passwordforgotten' && state.current.name !== '') {
              state.transitionTo('login');
            }
          } else if (response.status === 403) {
            const resourceUrl = response.config.url;
            if (resourceUrl) {
              ErrorService.notifyError(gettextCatalog.getString(
                gettext('This resource is forbidden: {{resourceUrl}}'),
                { resourceUrl: resourceUrl }
              ));
            } else {
              ErrorService.notifyError(gettextCatalog.getString(gettext('Unauthorized operation occurred.')));
            }
          } else if (response.status === 409) {
            // The resource is temporary busy (e.g. Anr is under import).
            ErrorService.notifyError(gettextCatalog.getString(gettext('This resource is temporary busy.')));
            if (response.data) {
              if (response.data.status) {
                ErrorService.notifyError(response.data.status);
                if (response.data.importStatus && response.data.importStatus.executionTime) {
                  ErrorService.notifyError('Execution time: ' + response.data.importStatus.executionTime);
                  ErrorService.notifyError('Created instances: ' + response.data.importStatus.createdInstances);
                } else if (response.data.importStatus && response.data.importStatus.errorMessage) {
                  ErrorService.notifyError('Anr import error: ' + response.data.importStatus.errorMessage);
                }
              }
            }
          } else if (response.status === 412) {
            // Human-readable error, with translation support
            for (var i = 0; i < response.data.errors.length; ++i) {
              ErrorService.notifyError(translateKnownErrorMessage(response.data.errors[i].message));
            }
          } else if (response.status >= 400 && response.config.url != 'auth') {
            var message = response.status;
            var url = response.config.url;

            // Either get our own custom error message, or Zend default error message
            if (response.data && response.data.message) {
              message = response.data.message;
            } else if (response.data && response.data.errors && response.data.errors.length > 0) {
              message = response.data.errors[0].message;
            }

            if (url.indexOf('?') > 0) {
              url = url.substring(0, url.indexOf('?'));
            }

            ErrorService.notifyFetchError(url, translateKnownErrorMessage(message) + " (" + response.status + ")");
          }

          var $q = $injector.get('$q');
          return $q.reject(response);
        }
      }
    }]);
    $httpProvider.interceptors.push('monarcHttpInter');
  }]).
  run(['ConfigService', 'UserService', 'gettextCatalog', '$rootScope', '$stateParams', '$injector', '$transitions',
  function (ConfigService, UserService, gettextCatalog, $rootScope, $stateParams, $injector, $transitions) {

    $rootScope.OFFICE_MODE = 'FO';

    ConfigService.loadConfig(function () {
      $rootScope.appVersion = ConfigService.getVersion();
      $rootScope.encryptedAppVersion = ConfigService.getEncryptedVersion();
      $rootScope.checkVersion = ConfigService.getCheckVersion();
      $rootScope.appCheckingURL = ConfigService.getAppCheckingURL();
      $rootScope.mospApiUrl = ConfigService.getMospApiUrl();
      $rootScope.terms = ConfigService.getTerms();
      $rootScope.languages = ConfigService.getLanguages();
      $rootScope.isBackgroundProcessActive = ConfigService.getBackgroundProcessActive();
      $rootScope.isExportDefaultWithEval = ConfigService.isExportDefaultWithEval();
      $rootScope.currentYear = new Date().getFullYear();

      var uiLang = UserService.getUiLanguage();
      if (uiLang === undefined || uiLang === null || !$rootScope.languages[uiLang]) {
        uiLang = ConfigService.getDefaultLanguageIndex();
      }
      gettextCatalog.setCurrentLanguage($rootScope.languages[uiLang].code);
      $rootScope.uiLanguage = $rootScope.languages[uiLang].flag;

      $rootScope.updatePaginationLabels();
    });

    $rootScope._langField = function (obj, field, forceDefault) {
      if(!obj){
        return '';
      }else{
        if(!field){
          if ($rootScope.getAnrLanguage() > 0) {
            return obj + $rootScope.getAnrLanguage();
          } else {
            return obj + ConfigService.getDefaultLanguageIndex();
          }
        }else{
          var anrLang = $rootScope.getAnrLanguage();
          if (anrLang > 0 && obj[field + anrLang] && obj[field + anrLang] != '' && !forceDefault) {
            return obj[field + anrLang];
          }else{
            var uiLang = UserService.getUiLanguage();
            if(!obj[field + uiLang] || obj[field + uiLang] == ''){
              return obj[field + ConfigService.getDefaultLanguageIndex()];
            }else{
              return obj[field + uiLang];
            }
          }
        }
      }
    };

    $rootScope.range = function (x,y) {
      var out = [];
      for (var i = x; i <= y; ++i) {
        out.push(i);
      }
      return out;
    };

    $rootScope.getUrlAnrId = function () {
      return $stateParams.modelId;
    };

    $rootScope.__AnrLanguage = {idx: 0};
    $rootScope.setAnrLanguage = function (lang) {
      $rootScope.__AnrLanguage.idx = lang;
    }
    $rootScope.getAnrLanguage = function () {
      return $rootScope.__AnrLanguage.idx;
    }

    // Setup dialog-specific scope based on the rootScope. This is mostly used to have access to _langField
    // in dialog views as well without having to manually declare it every time. We clone the scope so that
    // dialog have their distinct scope and avoid editing the parent one.
    $rootScope.$dialogScope = $rootScope.$new();

    // Update services ANR ID
    var lastKnownAnrId;
    $rootScope.$on('$locationChangeStart', function () {
      if ($rootScope.getUrlAnrId() != lastKnownAnrId) {
        var services = ['AmvService', 'AssetService', 'CategoryService', 'MeasureService',
        'ObjlibService', 'RiskService', 'TagService', 'ThreatService',
        'VulnService', 'ClientSnapshotService', 'QuestionService', 'RecordService',
        'ReferentialService', 'SOACategoryService', 'MeasureMeasureService',
        'ClientSoaService', 'MetadataInstanceService', 'SoaScaleCommentService', 'ClientRecommendationService'];
        for (var i = 0; i < services.length; ++i) {
          $injector.get(services[i]).makeResource();
        }
        lastKnownAnrId = $rootScope.getUrlAnrId();
      }
    });

    $transitions.onStart({to: 'main'}, function (trans) {
      $rootScope.appVersionCheckingTimestamp = new Date().getTime();
      return trans.router.stateService.target('main.project');
    });

    // Filter to convert a string to base 64
    $rootScope.convertToBase64 = function(value) {
      return btoa(value);
    }

    // Method to update pagination labels globally when switching language in account settings
    $rootScope.updatePaginationLabels = function () {
      $rootScope.paginationLabels = {
        page: gettextCatalog.getString('Page:'),
        rowsPerPage: gettextCatalog.getString('Rows per page:'),
        of: gettextCatalog.getString('of')
      }
    }

    //Handle rejection when close/ESC a $mdDialog
    $rootScope.handleRejectionDialog = function(reject) {
      if(reject !== undefined) throw reject;
    }

    //Get language code by index
    $rootScope.getLanguageCode = function(index) {
        return $rootScope.languages[index].code;
    }

    $rootScope.updatePaginationLabels();
  }
]);
