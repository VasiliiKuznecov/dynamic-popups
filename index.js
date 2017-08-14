(function () {
    var popupSelector = '.popup';
    var hiddenClass = 'popup-hidden';

    var index = 0;
    var isShown = false;

    var popups = [];

    init();

    function init() {
        cacheElems();
        console.log(popups);
        bindEvents();
        hidePopups();
    }

    function cacheElems() {
        popups = getPopups().sort(popupsComparator);
    }

    function bindEvents() {
        window.addEventListener('keydown', onKeyPress);
    }

    function hidePopups() {
        popups.forEach(function(popup) {
            popup.classList.add(hiddenClass);
        });
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
        }
    }

    function showPopup(popup) {
        popup.classList.remove(hiddenClass);
    }

    function getPopups() {
        var popupElems = document.querySelectorAll(popupSelector);

        return Array.prototype.slice.call(popupElems);
    }

    function popupsComparator(popup1, popup2) {
        var id1 = Number(popup1.getAttribute('data-id'));
        var id2 = Number(popup2.getAttribute('data-id'));

        return id1 - id2;
    }
})()
