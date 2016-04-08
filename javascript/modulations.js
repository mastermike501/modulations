var app = angular.module('modulationApp', []);

app.controller('modulationCntrl', function($scope, $http){
	
  $http.get('server/main.php').success(function(data){
    $scope.modulations = data.modulation;

    // console.log(data.modulation);
    // console.log(JSON.stringify(data.modulation));
  });

  $scope.getInterval = function (item){

	  if (angular.isArray(item.interval)) { //is array
	    return item.interval;
	  }
	  return item; //is object
  }

  $scope.getArticle = function (interval_name){
    var first_letter = interval_name[0].toLowerCase();
    var article = '';

    switch (first_letter){
      case 'a':
      case 'e':
      case 'i':
      case 'o':
      case 'u':
        article = 'an';
        break;
      default:
        article = 'a';
        break;
    }
    return article;
  }

  $scope.getOrdinal = function (interval_distance){
    if ($.isNumeric(interval_distance[interval_distance.length - 1])) {
      var interval = parseInt(interval_distance[interval_distance.length - 1]);
      var ordinal = '';

      switch (interval){
        case 1:
          ordinal = 'st';
          break; 
        case 2:
          ordinal = 'nd';
          break; 
        case 3:
          ordinal = 'rd';
          break; 
        default:
          ordinal = 'th';
          break; 
      }
      return ordinal;
    }
  }

  $scope.getProgression = function (item){

  	if (item.progression != undefined) {
      if (angular.isArray(item.progression)) { //is array
        return item.progression;
      }
      return item; //is object
    }
  }

  $scope.hasProgression = function (item){
    return item.progression != undefined;
  }

  $scope.isKeyChangePoint = function (swap_point, cur_index){
    //swap_point is 1-indexed
    //cur_index is 0-based
    //so add one to cur_index to normalize
    return swap_point == (cur_index + 1);
  }

  $scope.getNumberOfProgressions = function (){
    var numProgressions = 0;
    var modulations = $scope.modulations;
    
    if (modulations != undefined) {
      for (var i = 0; i < modulations.length; i++) {
          var prog = modulations[i].progressions;

          if (!$.isEmptyObject(prog)) {
            var progs = prog.progression;

            if ($.isArray(progs)) {
              numProgressions += progs.length;
            } else{
              numProgressions += 1;
            }
          }
      }
      return numProgressions;
    } 
  }
});


app.controller('navCntrl', function($scope){
  $scope.navOptions = ['Home', 'About', 'The Good Stuff', 'Usage'];
  $scope.bigCurSelected = 0;
  $scope.smallCurSelected = 0;

  $scope.bigNavClick = function (nav_item){
    $scope.bigCurSelected = parseInt(nav_item[nav_item.length - 1]);

		$('body > .container').fadeOut(200, function(){
      $(this).hide();
      $('#' + nav_item).hide().fadeIn(200).removeClass('hidden');
    });
  }

  $scope.smallNavClick = function (nav_item){
    $scope.smallCurSelected = nav_item;
  }
});