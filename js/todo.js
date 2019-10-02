"use strict";

const ENTER_KEY = 13;
const SELECTED = "selected";

$(document)
    .ready(function () {

        function generateUUID() {
            /*jshint bitwise:false */
            var i,
                random;
            var uuid = '';

            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;
                if (i === 8 || i === 12 || i === 16 || i === 20) {
                    uuid += '-';
                }
                uuid += (i === 12
                    ? 4
                    : (i === 16
                        ? (random & 3 | 8)
                        : random)).toString(16);
            }
            return uuid;
        }

        // code to be implemented
        const $inputField = $("input.input-text");

        setFunctionalitiesToExistingElements();

        setFilterBehaviour();

        $("div#button").on({
            click: addNewTodoItem
        });

        $inputField.on({
            keypress: function (ev) {
                const key = (ev.keyCode ? ev.keyCode : ev.which);
                if (key === ENTER_KEY) {
                    addNewTodoItem();
                }
            },
            focusin: clearInputArea
        });

        function addNewTodoItem() {
            addToTodoList($inputField.val());
            setFunctionalitiesToExistingElements();
            triggerCurrentFilter();
            clearInputArea();
        }

        function addToTodoList(text) {
            const input = $("<input>", {name: "done-todo", type: "checkbox", class: "done-todo"});
            const li = $("<li>", {id: generateUUID(), class: "", html: input});
            const span = $("<span>", {text: text});

            li.append(span);

            $("ol").append(li);
        }

        function setFunctionalitiesToExistingElements() {
            $("input").click(function () {
                if ($(this).is(':checked')) {
                    $(this).parent().addClass("checked");
                } else {
                    $(this).parent().removeClass("checked");
                }
            });

            $("span").on({
                dblclick: function () {
                    $(this).attr("contenteditable", true);
                },
                keypress: function (ev) {
                    const key = (ev.keyCode ? ev.keyCode : ev.which);
                    if (key === ENTER_KEY) {
                        $(this).attr("contenteditable", false);
                    }
                },
                focusout: function () {
                    $(this).attr("contenteditable", false);
                }
            });
        }

        function triggerCurrentFilter() {
            $("a.selected").click();
        }

        function clearInputArea() {
            $inputField.val("");
        }

        function setFilterBehaviour() {
            const $allFilter = $("a[data-filter=all]");
            const $activeFilter = $("a[data-filter=active]");
            const $completeFilter = $("a[data-filter=complete]");

            $allFilter.click(function () {
                unSelectFilters();
                $("ol>li").show();
                $allFilter.addClass(SELECTED);
            });
            $activeFilter.click(function () {
                unSelectFilters();
                $("ol>li:not(.checked)").show();
                $("ol>li.checked").hide();
                $activeFilter.addClass(SELECTED);
            });
            $completeFilter.click(function () {
                unSelectFilters();
                $("ol>li:not(.checked)").hide();
                $("ol>li.checked").show();
                $completeFilter.addClass(SELECTED);
            });

            function unSelectFilters() {
                const filters = [$allFilter, $activeFilter, $completeFilter];
                for (let filter of filters) {
                    filter.removeClass(SELECTED);
                }
            }
        }
    });