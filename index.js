(function () {
    var popupSelector = '.popup';
    var targetSelector = '.target';
    var hiddenClass = 'popup_hidden';
    var activeClass = 'target_active';

    var index = 0;
    var isShown = false;

    var popups = [];
    var targets = [];

    init();

    function init() {
        cacheElems();
        bindEvents();
        hidePopups();
    }

    function cacheElems() {
        popups = getElems(popupSelector).sort(elemsComparator);
        targets = getElems(targetSelector).sort(elemsComparator);
    }

    function bindEvents() {
        window.addEventListener('keydown', onKeyPress);
    }

    function hidePopups() {
        popups.forEach(function (popup) {
            popup.classList.add(hiddenClass);
        });

        targets.forEach(function (target) {
            target.classList.remove(activeClass);
        })
    }

    function onKeyPress(event) {
        switch (event.keyCode) {
            case 37:
                onLeft();

                break;
            case 39:
                onRight();

                break;
            case 27:
                onEscape();
        }

        updatePopups();
    }

    function onLeft() {
        if (!isShown) {
            isShown = true;

            return;
        }

        var shifted = index - 1;
        var lastIndex = popups.length - 1;

        index = shifted < 0 ? lastIndex : shifted;
    }

    function onRight() {
        if (!isShown) {
            isShown = true;

            return;
        }

        index = (index + 1) % popups.length;
    }

    function onEscape() {
        isShown = !isShown;
    }

    function updatePopups() {
        hidePopups();

        if (isShown) {
            showPopup(popups[index]);
            lightTarget(targets[index]);
        }
    }

    function lightTarget(target) {
        target.classList.add(activeClass);
    }

    function showPopup(popup) {
        popup.classList.remove(hiddenClass);
    }

    function getElems(selector) {
        var elems = document.querySelectorAll(selector);

        return Array.prototype.slice.call(elems);
    }

    function elemsComparator(popup1, popup2) {
        var id1 = Number(popup1.getAttribute('data-id'));
        var id2 = Number(popup2.getAttribute('data-id'));

        return id1 - id2;
    }
})()
