// CIVIS YouPower App

angular.module('civis.youpower.actions',[]);
angular.module('civis.youpower.communities',[]);
angular.module('civis.youpower.settings',[]);
angular.module('civis.youpower.welcome',[]);
//DM: added module
angular.module('civis.youpower.prosumption',['highcharts-ng']);
angular.module('civis.youpower.donation',[]);

angular.module('civis.youpower', [
  'ionic',
  'ionic.rating',
  'ngResource',
  // 'firebase',
  'pascalprecht.translate',
  'civis.youpower.main',
  'civis.youpower.actions',
  'civis.youpower.communities',
  'civis.youpower.settings',
  'civis.youpower.welcome',
  'civis.youpower.services',
  'civis.youpower.translations',
  //DM: added module
  'civis.youpower.prosumption',
  'civis.youpower.donation',
  ])

.run(function($ionicPlatform, $rootScope, $window, AuthService) {

  $rootScope.scale = 5;

  // Making underscore available in the angular expressions
  $rootScope._=_;


  HOST = 'https://app.civisproject.eu';

  $rootScope.getNumber = function(num) {
    return new Array(num);
  }

  $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
    if (!AuthService.isAuthenticated()) {
      if (next.name !== 'welcome') {
        event.preventDefault();
        $state.go('welcome');
      }
    }
  });


  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
  if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
  }
  if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
      if (cordova.platformId == 'android') {
        StatusBar.backgroundColorByHexString("#249143");
      }
    }
  });
})


.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $translateProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('welcome', {
    url: "/welcome",
    templateUrl: "app/welcome/welcome.html",
    controller: 'WelcomeCtrl'
  })

  // setup an abstract state that will contain the main navigation (i.e. menu)
  .state('main', {
    url: "/app",
    abstract: true,
    templateUrl: "app/app/menu.html",
    controller: 'AppCtrl'
  })

  .state('main.actions', {
    url: '/actions',
    abstract:true,
    views: {
      'menuContent': {
        templateUrl: 'app/actions/tabs.html',
        controller: 'ActionsCtrl'
      }
    }
  })


  .state('main.actions.yours', {
    url: '/yours',
    views: {
      'tab-actions': {
        templateUrl: 'app/actions/index.html',
        controller: 'ActionCtrl' 
      }
    }
  })


  .state('main.actions.action', {
    url: '/suggested/:id',
    views: {
      'tab-actions': {
        templateUrl: 'app/actions/action.html',
        controller: 'ActionCtrl'
      }
    }
  })



    // .state('main.actions.action', {
    //   url: '/:id',
    //   templateUrl: 'app/actions/action.html',
    //   controller: 'ActionCtrl'
    // })

.state('main.actions.details', {
  url: '/:type/:index',
  views: {
    'tab-actions': {
      templateUrl: 'app/actions/action-details.html',
      controller: 'ActionsListCtrl'
    }
  }
})



.state('main.actions.completed', {
  url: '/:id/completed',
  views: {
    'tab-actions': {
      templateUrl: 'app/actions/action-completed.html',
      controller: 'FormsCtrl'
    }
  }
})

.state('main.actions.abandoned', {
  url: '/:id/abandoned',
  views: {
    'tab-actions': {
      templateUrl: 'app/actions/action-abandoned.html',
      controller: 'FormsCtrl'
    }
  }
})

///////

.state('main.actions.household', {
  url: '/household',
  views: {
    'tab-household': {
      templateUrl: 'app/household/index.html',
    }
  }
})

.state('main.actions.communities', {
  url: '/communities',
  views: {
    'tab-communities': {
      templateUrl: 'app/communities/index.html',
    }
  }
})

.state('main.actions.achievements', {
  url: '/achievements',
  views: {
    'tab-achievements': {
      templateUrl: 'app/achievements/index.html',
    }
  }
})


.state('main.donation', {
  url: '/donation',
  views: {
    'menuContent': {
      templateUrl: 'app/donation/index.html',
      controller: 'donationCtrl'
    }
  }
}
)

.state('main.prosumption', {
  url: '/prosumption',
  views: {
    'menuContent': {
      templateUrl: 'app/prosumption/tabs.html',
          controller: 'prosumptionCtrl'
        }
      }
    })


  .state('main.prosumption.yours', {
    url: '/yours',
    views: {
      'tab-prosumption-yours': {
        templateUrl: 'app/prosumption/index_yours.html',
       controller: 'dataVizCtrl' 
      }
    }
  })
.state('main.prosumption.appliances', {
    url: '/appliances',
    views: {
      'tab-prosumption-appliances': {
        templateUrl: 'app/prosumption/index_appliances.html',
       //controller: 'dataVizCtrl' 
      }
    }
  })

.state('main.prosumption.community', {
    url: '/community',
    views: {
      'tab-prosumption-community': {
        templateUrl: 'app/prosumption/index_community.html',
       controller: 'dataVizCtrl' 
      }
    }
  })
.state('main.prosumption.vizEnergyMeteo', {
  url: '/vizEnergyMeteo', 
  views: {
    'tab-prosumption-yours': {
      templateUrl: 'app/prosumption/viz_energy_meteo.html',
      controller: 'dataVizCtrl',
    }
  }
}
)
.state('main.prosumption.vizConsumption', {
  url: '/viz',
  views: {
    'tab-prosumption-yours': {
    templateUrl: 'app/prosumption/viz_consumption_yours.html',
    controller: 'dataVizCtrl' ,
    }
  }
})
.state('main.prosumption.vizProduction', {
  url: '/viz2',
  views: {
    'tab-prosumption-yours': {
    templateUrl: 'app/prosumption/viz_production_yours.html',
    controller: 'dataVizCtrl' ,
    }
  }
})
.state('main.prosumption.vizHistoricalPersonal', {
  url: '/vizHistoricalPersonal',
  views: {
    'tab-prosumption-yours': {
      templateUrl: 'app/prosumption/viz_historical_personal.html',
      controller: 'dataVizCtrl',
    }
  }
}
)
.state('main.prosumption.vizHistoricalComparison', {
  url: '/vizHistoricalComparison',
  views: {
    'tab-prosumption-yours' : {
      templateUrl: 'app/prosumption/viz_historical_comparison.html',
      controller: 'dataVizCtrl',
    }
  }
}
)
.state('main.prosumption.vizAppliance', {
    url: '/vizAppliance',
    views: {
      'tab-prosumption-appliances': {
        templateUrl: 'app/prosumption/viz_appliance.html',
       controller: 'dataVizCtrl' 
      }
    }
  })
.state('main.brf', {
  url: '/brf',
  views: {
    'menuContent': {
      templateUrl: 'app/brf/index.html',
    }
  }
})

.state('main.communities', {
  url: '/communities',
  views: {
    'menuContent': {
      templateUrl: 'app/communities/index.html',
      controller: 'CommunitiesCtrl'
    }
  }
})

.state('main.settings', {
  url: '/settings',
  abstract: true,
  views: {
    'menuContent': {
      templateUrl: 'app/settings/tabs.html',
      controller: 'SettingsCtrl'
    }
  }
})

.state('main.settings.index', {
  url: '',
  views: {
    'tab-index': {
      templateUrl: 'app/settings/index.html',
    }
  }
})

.state('main.settings.personal', {
  url: '/personal',
  views: {
    'tab-personal': {
      templateUrl: 'app/settings/personal.html',
    }
  }
})

.state('main.settings.household', {
  url: '/household',
  views: {
    'tab-household': {
      templateUrl: 'app/settings/household.html'
    }
  }
})

.state('main.settings.preferences', {
  url: '/preferences',
  views: {
    'tab-preferences': {
      templateUrl: 'app/settings/preferences.html',
    }
  }
})

.state('main.about', {
  url: '/about',
  views: {
    'menuContent': {
      templateUrl: 'app/about/index.html',
    }
  }
})

  // .state('tab.performance', {
  //   url: '/performance',
  //   views: {
  //     'tab-performance': {
  //       templateUrl: 'templates/tab-performance.html',
  //       controller: 'PerformanceCtrl'
  //     }
  //   }
  // })

  // .state('tab.challenges', {
  //   url: '/challenges',
  //   views: {
  //     'tab-challenges': {
  //       templateUrl: 'templates/tab-challenges.html',
  //       controller: 'ChallengesCtrl'
  //     }
  //   }
  // })

;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/welcome');

});





