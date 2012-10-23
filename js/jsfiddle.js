 filepicker.setKey("blah");
            var makeJsFiddle = function(editor_id, width, height) {
                var wrapper = $('<div></div>').addClass("js-fiddle");
                var inner = $('<div></div>').addClass("wrapper");
                var console_wrapper = $('<div></div>').addClass("console");
                var console_text = $("<span></span>").addClass("console-text");
                var run_button = $("<span></span>").addClass("run-button");
                console_text.text("Output goes here");
                run_button.text("Run");

                console_wrapper.append(console_text).append(run_button);
                console_text.width(width - 80);

                wrapper.width(width);
                inner.height(height - 40);

                var edObj = $("#"+editor_id);
                wrapper.insertBefore(edObj);
                wrapper.append(inner);
                inner.append(edObj);
                wrapper.append(console_wrapper);

                //Set up ace editor
                var editor = ace.edit(editor_id);
                editor.setTheme("ace/theme/dawn");
                //editor.setTheme("ace/theme/solarized");
                editor.getSession().setMode("ace/mode/javascript");

                var original_text = editor.getValue();

                run_button.click(function(){
                    var val = editor.getValue();
                    //clear text
                    console_text.text('');
                    //closure to overload console
                    (function(){
                        var console = {};
                        console.log = function(obj) {
                            var currText = console_text.html();
                            currText += obj + "<br/>";
                            console_text.html(currText);
                        };
                        eval(val);
                    })();
                    console_text.css('color', '#000');
                });
            };
            $(function(){
                makeJsFiddle("simpleedit", 500, 100);
                makeJsFiddle("convertedit", 500, 200);
            });