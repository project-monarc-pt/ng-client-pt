(function () {

  angular
    .module('ClientApp')
    .factory('ClientThemeConfig', [function () {
      return {
        // Graph rendering and graph image export settings.
        charts: {
          surfacePrimary: '#FFFFFF',
          surfaceTransparent: 'transparent',

          categoryScale: ['#1f77b4', '#ff7f0e', '#2ca02c', '#9467bd', '#d62728', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'],
          riskScale: ['#2FA36B', '#F1B800', '#C0392B'],
          riskScaleReversed: ['#C0392B', '#F1B800', '#2FA36B'],
          riskScaleBinary: ['#2FA36B', '#C0392B'],

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
          sidenavFooterLogo: 'img/NC3_Logo_MONARC_negativo.svg',
        },

        // Shared typography settings for JS consumers.
        typography: {
          fontFamily: 'Arial, "Open Sans", sans-serif'
        }
      };
    }]);

})();
