(function () {

  angular
    .module('ClientApp')
    .factory('ClientThemeConfig', [function () {
      return {
        // Graph rendering and graph image export settings.
        charts: {
          surfacePrimary: '#FFFFFF',
          surfaceTransparent: 'transparent',

          riskScale: ['#D6F107', '#FFBC1C', '#FD661F'],
          riskScaleBinary: ['#D6F107', '#FD661F'],
          riskScaleReversed: ['#FD661F', '#FFBC1C', '#D6F107'],

          export: {
            background: '#FFFFFF',
            transparentBackground: 'transparent'
          }
        },

        // Export template styling outside the graph itself.
        exports: {
          pptxHeaderFill: '006fba',
          pptxDividerLine: 'FFC107'
        },

        // Shared brand assets.
        branding: {
          logo: 'img/logo-monarc.png',
          authBackground: 'img/bg-cases.png'
        }
      };
    }]);

})();
