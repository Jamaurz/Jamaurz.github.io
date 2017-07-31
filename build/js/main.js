var app=angular.module("myapp", []);

app.controller('mainCtrl', ['localStorage', function (localStorage) {
    var vm = this;
    var defItems = [{"id":1,"name":"test","img":"169b95","comments":[{"id":2,"text":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, inventore nisi voluptatum porro sequi, illum!","$$hashKey":"object:18"}]},{"id":1501356102484,"name":"test2","img":"882b39","comments":[]}];
    vm.selected = false;
    vm.switchMenu = false;
    vm.item = localStorage.getObject('items', defItems);

    vm.addNew = function() {
        if(vm.newItem.length > 0) {
            var charBox = '0123456789abcdef';
            var color = '';
            for(var i = 0; i < 6; i++) {
                color += charBox[Math.floor(Math.random() * charBox.length)];
            }
            var date = new Date();
            vm.item.push({id: date.getTime(), name: vm.newItem, img: color, comments: []});
            localStorage.setObject('items', vm.item);
            vm.newItem = '';
        }
    }

    vm.select = function(selected) {
        vm.selected = selected;
        vm.selectedStyle = {
            'background-color': selected.img
        }
    }

    vm.menuActive = function() {
        vm.switchMenu = !vm.switchMenu;
    }

    vm.addComment = function(id) {
        var date = new Date();
        var res = vm.item.filter(function(object) {
            return object.id == id;
        });
        res[0].comments.push({id: date.getTime(), text: vm.newComment});
        localStorage.setObject('items', vm.item);
        vm.newComment = '';
    }

    vm.deleteItem = function(id) {
        var res = vm.item.filter(function(object) {
            return object.id != id;
        });
        vm.item = res;
        localStorage.setObject('items', vm.item);
        vm.selected = false;
    }

    vm.selectActive = function(id) {
        if(id == vm.selected.id) {
            return 'active-item';
        } 
    }

}]);


app.factory('localStorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue || false;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key, defaultValue) {
      if($window.localStorage[key] != undefined){
          return JSON.parse($window.localStorage[key]);
      }else{
        return defaultValue || false;
      }
    },
    remove: function(key){
      $window.localStorage.removeItem(key);
    },
    clear: function(){
      $window.localStorage.clear();
    }
  }
}]);