(function () {

  angular
    .module('ClientApp')
    .factory('ClientThemeConfig', [function () {
      return {
        // Graph rendering and graph image export settings.
        charts: {
          surfacePrimary: '#FFFFFF',
          surfaceTransparent: 'transparent',

          categoryScale: ['#308AA1', '#231F20', '#BCBEC0', '#78909C', '#6D6F71'],
          riskScale: ['#BCBEC0', '#78909C', '#231F20'],
          riskScaleBinary: ['#BCBEC0', '#231F20'],

          export: {
            background: '#FFFFFF',
            transparentBackground: 'transparent'
          }
        },

        // Export template styling outside the graph itself.
        exports: {
          pptxHeaderFill: '308AA1',
          pptxDividerLine: '231F20',
          pptxAccentBarFill: '308AA1',
          pptxBackground: 'FFFFFF',
          pptxTextOnHeader: 'FFFFFF',
          pptxTextOnPrimary: 'FFFFFF',
          
          pptxLogo: 'img/CNCS_positivo.png',
          
          fontFamily: 'Arial',
        },

        // Shared brand assets.
        branding: {
          logo: 'img/CNCS_cores.svg',
          sidenavLogo: 'img/CNCS_negativo.svg',
        },

        // Shared typography settings for JS consumers.
        typography: {
          fontFamily: 'Arial, "Open Sans", sans-serif'
        }
      };
    }]);

})();
