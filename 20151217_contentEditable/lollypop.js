/**
 * makes hot-editable element
 **/
function JohnDoe() {
    this.targets = [];
    this.cancelBtn = document.createElement('button');
    
    this.cancelBtn.innerHTML = 'x';
    this.cancelBtn.className = 'he-button-cancel';
    this.cancelBtn.addEventListener('click', this.editCancel.bind(this));
};

JohnDoe.prototype.active = function() {
    var targets = document.querySelectorAll('.hot-editable'), i=0;
    
    while(targets[i]) { this.targets.push(targets[i++]); }
    
    this.targets.forEach(function(elem) {
        // make it content-editable <- *** 안해!
        elem.addEventListener('click', this.editStart.bind(this));
        elem.addEventListener('blur', this.editEnd.bind(this));
        // key events
    //    el.addEventListener('')
    }, this);
};

JohnDoe.prototype.deactive = function() {
    this.targets.forEach(function(elem) {
        elem.removeAllEventListeners();
    });
    this.targets = [];
};

JohnDoe.prototype.editStart = function(e) {
    this.curElem = e.target;
    
    // backup current text;
    this.stash = this.curElem.textContent;
    
    // make buttons visible;
    this.cancelBtn.style.left = (this.curElem.offsetLeft + this.curElem.offsetWidth + 8) + 'px';
    this.cancelBtn.style.top = this.curElem.offsetTop + 'px';
    document.body.appendChild(this.cancelBtn);
    
    // set content-editable : true
    this.curElem.setAttribute('contenteditable', true);

    // set caret to content
    this.curElem.focus();

};

JohnDoe.prototype.editEnd = function(e) {
    this.curElem.textContent = this.curElem.textContent;
    
    e.target.setAttribute('contenteditable', false);
};

JohnDoe.prototype.editCancel = function(e) {
    // rollback
    this.curElem.textContent = this.stash;
    this.editEnd(e);
};

var test = new JohnDoe();
test.active();