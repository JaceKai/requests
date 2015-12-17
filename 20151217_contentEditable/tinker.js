// hmm... how to accept <enter> key if the <div> allows plain text only :(
(function() {
    var target = null, original = '';
    var oriAlp, alpha=1, asc = 1, blinker = null;    // for blinker
    
    var startBlink = function(e) {
        console.log("hey");
        oriAlp = target.style.opacity;
        
        blinker = setInterval(function() {
            target.style.opacity = alpha;
            alpha += 0.1 * asc;
            if(alpha==1 || alpha==0.5) asc *= -1;
        }, 100);
    };
    
    var stopBlink = function(e) {
        clearInterval(blinker);
        target.style.opacity = oriAlp;
    };
    var confirm = function(s) {
        btnGroup.style.display = 'none';
        original = '';
        target = null;        
    };
    var cancelEdit = function(e) {
        target.innerHTML = original;
        confirm(e);
    };
    var flatten = function(e) {
        target.textContent = target.textContent;
            // ㄴ should accept <br/> when className were tinker-multi
    };
    var startEdit = function(e) {
        target = e.target,
            isTinkerSingle = target.className.indexOf("tinker-single")+1,
            isTinkerMulti = target.className.indexOf("tinker-multi")+1;
        if(isTinkerSingle || isTinkerMulti) {
            //target.addEventListener('mouseover', startBlink); // 
            //target.addEventListener('mouseout', stopBlink);
            target.addEventListener('blur', confirm);
            target.addEventListener('input', flatten);
        }
        
        // backup text content
        original = target.innerHTML;
        
        // positioning buttons
        btnGroup.style.left = target.offsetLeft + 'px';
        btnGroup.style.top = target.offsetTop - 26 + 'px';
        btnGroup.style.display = 'inline';
        
        // set content-editable & focus
        target.setAttribute('contenteditable', true);
        target.focus();
            // TODO : place caret to exact position where you've clicked
            // checked chrome/WIN works!
    };

    document.body.addEventListener('click', startEdit);
    
    var btnGroup = document.createElement('div');
        btnGroup.style.position = 'absolute';
        btnGroup.style.display = 'none';
    var confirmBtn = document.createElement('button');
        confirmBtn.innerHTML = 'v';
        confirmBtn.addEventListener('click', confirm);
    var cancelBtn = document.createElement('button');
        cancelBtn.innerHTML = 'x';
        cancelBtn.addEventListener('click', cancelEdit);
    btnGroup.appendChild(confirmBtn);
    btnGroup.appendChild(cancelBtn);
    document.body.appendChild(btnGroup);
    
    // TODO : add buttons & event listeners
})();
