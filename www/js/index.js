var app = {};
var starterScope
app.initialize = function() {
    document.addEventListener("online", function(){
    	starterScope.closeModal('jelly')
    }, false);
    document.addEventListener("offline", function(){
    	starterScope.openModal('slide-in-up')
    }, false);
};
