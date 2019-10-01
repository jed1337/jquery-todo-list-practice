"use strict";

const ENTER_KEY = 13;
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

        setFunctionalitiesToExistingElements();

        $("div#button").on({
            click: function () {
                addToTodoList(getInputText());
                setFunctionalitiesToExistingElements();
            }
        });

        function getInputText() {
            return $("input.input-text").val();
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
                if($(this).is(':checked')){
                    $(this).parent().addClass("checked");
                }
                else{
                    $(this).parent().removeClass("checked");
                }
            });

            $("span").on({
                dblclick: function () {
                    $(this).attr("contenteditable", true);
                },
                click: function (ev) {
                    const key = (ev.keyCode ? ev.keyCode : ev.which);
                    if (key === ENTER_KEY) {
                        $(this).attr("contenteditable", false);
                    }
                },
                focusout: function(){
                    $(this).attr("contenteditable", false);
                }
            });
        }
    });