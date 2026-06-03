(function () {
  angular
    .module('ClientApp')
    .controller('ClientLoginCtrl', [
      '$scope', '$state', '$http', 'toastr', 'gettextCatalog', 'UserService', 'ConfigService', 'ClientThemeConfig',
      ClientLoginCtrl
    ]);

  /**
   * Login Controller for the Client module
   */
  function ClientLoginCtrl($scope, $state, $http, toastr, gettextCatalog, UserService, ConfigService, ClientThemeConfig) {
    $scope.isLoggingIn = false;
    $scope.pwForgotMode = false;
    $scope.brandLogo = ClientThemeConfig.branding.logo;
    $scope.twoFAMode = false;
    $scope.twoFANotCorrect = false;
    $scope.twoFASetUpMode = false;
    $scope.recoveryCodeMode = false;
    $scope.user = {
      'email': null,
      'password': null,
      'otp': null,
      'recoveryCode': null,
      'verificationCode': null,
    };
    $scope.captcha = {};
    $scope.isCaptchaActivated = false;

    var getActiveUiLanguage = function () {
      var uiLanguage = UserService.getUiLanguage();
      if (uiLanguage !== undefined && uiLanguage !== null) {
        return uiLanguage;
      }

      var currentLanguage = gettextCatalog.getCurrentLanguage();
      var languages = ConfigService.getLanguages();
      for (var index in languages) {
        if (Object.prototype.hasOwnProperty.call(languages, index) && languages[index].code === currentLanguage) {
          return index;
        }
      }

      return ConfigService.getDefaultLanguageIndex();
    };

    $scope.passwordForgotten = function () {
      $scope.pwForgotMode = true;
    };

    $scope.passwordForgottenImpl = function () {
      $http.post('api/admin/passwords', {
        email: $scope.user.email,
        language: getActiveUiLanguage()
      }).then(function (data) {
        toastr.success(gettextCatalog.getString(
          "The password reset request has been sent successfully. You will receive a mail shortly with information on" +
          "how to reset your account password."
        ));
        $scope.returnToLogin();
      });
    };

    $scope.recoveryMode = function () {
      $scope.recoveryCodeMode = true;
      $scope.twoFAMode = false;
      $scope.twoFANotCorrect = false;
      $scope.twoFASetUpMode = false;
    };

    $scope.returnToLogin = function () {
      $scope.pwForgotMode = false;
      $scope.twoFAMode = false;
      $scope.twoFANotCorrect = false;
      $scope.twoFASetUpMode = false;
      $scope.recoveryCodeMode = false;
      $scope.user.otp = "";
      $scope.user.recoveryCode = "";
    };

    $scope.login = function () {
      if ($scope.isCaptchaActivated) {
        const captchaPayload = {
          captchaInput: $scope.captcha.input,
          captchaId: $scope.captcha.captchaId
        };
        $http.post('api/captcha', captchaPayload).then(function (response) {
          /* CAPTCHA is valid, so proceed with login */
          if (response.data.isCaptchaValid) {
            $scope.performAuth();
          } else {
            toastr.warning(gettextCatalog.getString('Invalid CAPTCHA. Please try again.'));
            $scope.refreshCaptcha();
          }
        }).catch(function (error) {
          console.error('CAPTCHA validation failed:', error);
          toastr.warning(gettextCatalog.getString('Error of the CAPTCHA validation.'));
          // Refresh CAPTCHA on failure
          $scope.refreshCaptcha();
        });
      } else {
        $scope.performAuth();
      }
    }

    $scope.performAuth = function() {
      $scope.isLoggingIn = true;
      $scope.twoFAMode = false;
      $scope.twoFANotCorrect = false;
      $scope.twoFASetUpMode = false;
      $scope.recoveryCodeMode = false;

      UserService.authenticate(
        $scope.user.email,
        $scope.user.password,
        $scope.user.otp,
        $scope.user.recoveryCode,
        $scope.user.verificationCode
      ).then(
        function () {
          $state.transitionTo('main.project');
        },

        function (revoked) {
          $scope.isLoggingIn = false;
          if (!revoked) {
            $scope.user.otp = "";
            $scope.user.recoveryCode = "";
            toastr.warning(gettextCatalog.getString('Your e-mail address or password is invalid, please try again.'));
            $scope.loadCaptcha();
          } else {
            $scope.isCaptchaActivated = false;
            $scope.twoFAMode = revoked.includes("2FARequired");
            $scope.twoFASetUpMode = revoked.includes("2FAToBeConfigured:");
            $scope.twoFANotCorrect = revoked.includes("2FACodeNotCorrect");
            if ($scope.twoFAMode) {
              toastr.warning(gettextCatalog.getString('Please enter your two-factor authentication token.'));
            } else if ($scope.twoFASetUpMode) {
              toastr.warning(gettextCatalog.getString('Please configure two-factor authentication.'));
              $scope.user.qrcode = revoked.split(":", 3).slice(1).join(":");
            } else if ($scope.twoFANotCorrect) {
              toastr.warning(gettextCatalog.getString('The two-factor authentication token is not correct.'));
            }
          }
        }
      );
    }

    /* Fetch initial CAPTCHA */
    $scope.loadCaptcha = function () {
      $http.get('api/captcha').then(function (response) {
        $scope.isCaptchaActivated = response.data.isCaptchaActivated;
        if ($scope.isCaptchaActivated) {
          $scope.captcha = {
            captchaId: response.data.captchaId,
            captchaUrl: response.data.captchaUrl,
            input: ''
          };
        }
      }).catch(function (error) {
        toastr.warning(gettextCatalog.getString('Error loading CAPTCHA.'));
        console.error('Error loading CAPTCHA:', error);
      });
    };

    /* Refresh CAPTCHA */
    $scope.refreshCaptcha = function () {
      $scope.loadCaptcha();
    };

    /* Load CAPTCHA on controller initialization */
    $scope.loadCaptcha();
  }
})();
