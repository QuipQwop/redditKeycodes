$(".rank").each(function(){
    $(this).text($(this).text().substring($(this).text().length-1));
    $(this).attr("picked", "false");
});
lastEvent = new Object();
lastEvent.keyCode=0;
$(document).on("keydown",function(e){
    var code = e.keyCode;
    console.log(code);

    //if(code-48==0) code=58;
    console.log($(":focus").prop("tagName"));

    if($(":focus").prop("tagName")=="INPUT" || $(":focus").prop("tagName")=="TEXTAREA"){
        console.log("is focused on input");
        // return;
    }
    else{
        //alert(code-48);
        try{
            if($(".rank:contains(" + (code-48) + ")").attr("picked")=="false"){//if the item's picked attribute is false, set it to true. this allows for more manageable interactions with the selected item.
                $(".rank").each(function(){
                    $(this).attr("picked","false");
                    $(this).css("color","black");
                    $(this).css("font-weight","normal");
                    $(this).parent().css("border","");
                });
                $(".rank:contains(" + (code-48) + ")").attr("picked","true");
                $(".rank:contains(" + (code-48) + ")").css("color","red");
                $(".rank:contains(" + (code-48) + ")").css("font-weight","900");
                //add a border, on subreddits that don't display the rank number
                $(".rank:contains(" + (code-48) + ")").parent().css("border-style","solid");
                $(".rank:contains(" + (code-48) + ")").parent().css("border-width","2px");
                $(".rank:contains(" + (code-48) + ")").parent().css("border-color","red");
                $(".rank:contains(" + (code-48) + ")").parent().css("overflow","hidden");
                //alert("not click");
            }//end of if($(".rank:contains(..)..."picked")=="false")
            else{
                $(".rank:contains("+ (code-48)+ ")").parent().children(".entry").children(".title").children("a")[0].click();//click on text links
            }
        }catch(err){
            if(lastEvent.keyCode==191){// if the previous key pressed was /, prepare for specialized input; used for searching
                var $inputbox = null;
                if(code==107){//if the '+' key is pressed
                    //build a textbox that will take you to the inputted subreddit on enter
                    $inputbox = $("<input></input>");
                    $inputbox.attr("id","subredditPicker");
                    $inputbox.attr("type","text");
                    $inputbox.css("position","relative");
                    $inputbox.css("left",0);
                    $inputbox.on("keydown",function(q){
                        if(q.keyCode==13){
                            window.location=" https://www.reddit.com/r/"+$("#subredditPicker").val().substring(1);
                        }//end of if(q.keyCode==13)
                    });//end of $inputbox's on keydown event handler
                    $inputbox.on("input",function(){
                        if(($inputbox.val().length)===0){
                            $inputbox.val("+");
                        }//end of if($inputbox.val().length===0)
                    });//end of setting $inputbox's on input event listener
                    $inputbox.css("z-index","100");//set the input box in front of the multireddits tab, if open
                    $("body").append($inputbox);
                    $inputbox.focus();
                }//end of else if(code==107)
                else if(code==85){// if the 'u' key is pressed
                    e.preventDefault();
                    $inputbox = $("<input></input>");
                    $inputbox.attr("id","userPicker");
                    $inputbox.attr("type","text");
                    $inputbox.css("position","relative");
                    $inputbox.css("left",0);
                    $inputbox.on("keydown",function(q){
                        if(q.keyCode==13){
                            window.location=" https://www.reddit.com/user/"+$("#userPicker").val().substring(1);
                        }//end of if(q.keyCode==13)
                    });//end of $inputbox's on keydown event handler
                    $inputbox.on("input",function(){
                        if(($inputbox.val().length)===0){
                            $inputbox.val("+");
                        }//end of if($inputbox.val().length===0)
                    });//end of setting $inputbox's on input event listener
                    $inputbox.css("z-index","100");//set the input box in front of the multireddits tab, if open
                    $("body").append($inputbox);
                    $inputbox.val("+");
                    $inputbox.focus();
                }//end of else if(code==85)
                else if(code==83){// if the 's' key is pressed, focus on the search box
                    e.preventDefault();
                    $("[placeholder='search']")[0].focus();
                }
                else if(code==67 && window.location.pathname.indexOf("comments")>-1){//if the 'c' key is pressed
                    e.preventDefault();
                    $inputbox = $("<input></input>");
                    $inputbox.attr("id","commentSelector");
                    $inputbox.attr("type","text");
                    $inputbox.css("position","relative");
                    $inputbox.val("+");
                    $inputbox.css("left",0);
                    $inputbox.on("input",function(){if($inputbox.val().length===0){
                        $inputbox.val("+");
                    }});
                    $inputbox.on("keydown",function(q){
                        if(q.keyCode==13){//if the enter key is pressed
                            var commentNum = parseInt($inputbox.val().substring(1));//get the contents of the div
                            console.log("Comment Num: " + commentNum);
                            window.scrollTo(0,$($(".comment")[commentNum-1]).offset().top);//scroll to the x-coordinate of the selected comment
                            $inputbox.val("+");
                        }
                    });
                    $inputbox.css("z-index","100");
                    $("body").append($inputbox);
                    $inputbox.focus();
                }
                
            }//end of if(lastEvent.keyCode==191)

            else if(code==82){//if the 'r' key is pressed     
                if(window.location.pathname=="/" || window.location.pathname.indexOf("/m/")>-1){//if on the home page or on a multireddit page

                    if($("[picked='true']").length>0)//if there's a picked element
                    {
                        $("[picked='true']").parent().children(".entry").children(".tagline").children(".subreddit")[0].click();//go to its subreddit
                        return;
                    }
                    else if($(".last-clicked").length>0){//if there's a last-clicked element
                        $(".last-clicked").children(".entry").children(".tagline").children(".subreddit")[0].click();//go to its subreddit
                        return;
                    }
                }
                window.location="https://www.reddit.com/r/random";//go to a random subreddit             
            }//end of if(code==82)
            else if(code==72){//if the 'h' key is pressed;
                window.location="https://www.reddit.com";//go home
            }
            else if(code==77){//if the 'm' key is pressed;
                window.location="http://www.reddit.com/user/" + $(".user").text().split(/\s+/)[0]; //go to the user's profile
            }
            else if(code==73){//if the 'i' key is pressed;
                window.location.pathname="/message/inbox";
            }
            else if(code==39){//if the right arrow is pressed
                e.preventDefault();
                $(":contains('next ›')")[7].click();
            }
            else if(code==37){//if the left arrow is pressed
                e.preventDefault();
                window.history.back();
            }
            else if(code==33 || code==34){//pageup/pagedown for up/downvoting
                if($(".last-clicked").length>0 || $("[picked='true']").length>0){
                    e.preventDefault();
                    if(code==33 && $("[picked='true']").length>0){//have the focused element take prescidence
                        $("[picked='true']").parent().children(".midcol").children("[aria-label='upvote']").click();//navigate from the rank span to the upvote arrow and click it
                    }
                    else if(code==34 && $("[picked='true']").length>0){
                        $("[picked='true']").parent().children(".midcol").children("[aria-label='downvote']").click();//navigate from the rank span to the downvote arrow and click it

                    }//end of else if(code==34 && $("[picked='true']").length>0)
                    else if(code==33 && $(".last-clicked").length>0){
                        $(".last-clicked").children(".midcol").children("[aria-label='upvote']").click();//navigate from the parent div to the upvote arrow and click it
                    }
                    else if(code==34 && $(".last-clicked").length>0){
                        $(".last-clicked").children(".midcol").children("[aria-label='downvote']").click();//navigate from the parent div to the downvote arrow and click it
                    }
                }//end of if($(".last-clicked").length>0 || $("[picked='true']").length>0)
            }//end of else if(code==33 || code==34)
            /* else if(code==67){
                if($(".last-clicked").length>0){
                  //  $(".last-clicked").children(".entry").children(".flat-list").children(".first").children("a")[0].click()
                }
            }*/
            else if(code==67){//if the user presses 'c', if an element is picked or a last-visited element exists, go to its comments
                if($("[picked='true']").length>0 || $(".last-clicked").length>0){
                    if($("[picked='true']").length>0){//check picked element first
                        $("[picked='true']").parent().children(".entry").children(".flat-list").children(".first").children()[0].click();
                    }
                    else{//then check last-clicked
                        $(".last-clicked").children(".entry").children(".flat-list").children(".first").children()[0].click();
                    }
                }//end of if(pickedElements.length>0 || lastClickedElements>0)
            }//end of if(code==67)
            else if(code==83){// if the 's' key is pressed
                if($("[picked='true']").length>0 || $(".last-clicked").length>0){
                    if($("[picked='true']").length>0){//check picked element first
                        $("[picked='true']").parent().children(".entry").children(".flat-list").children(".save-button").children()[0].click();//click the save link associated with the element
                    }
                    else{//then check last-clicked
                        $(".last-clicked").children(".entry").children(".flat-list").children(".save-button").children()[0].click();
                    }
                }//end of if(pickedElements.length>0 || lastClickedElements>0)
            }
            if(window.location.pathname.indexOf("/comments/")>-1){//if on the comments page for an article:
                if(code==76){//if the user presses the 'l' key
                    $("#siteTable").children(".thing").children(".entry").children(".title").children("a")[0].click();//go to the article
                }
            }
            if(window.location.pathname.indexOf("/user/")>-1){//if on the user's profile page, add special commands. MAKE SURE THESE DON'T OVERLAP ANY UNIVERSAL COMMANDS
                mainUrl = "https://www.reddit.com/user/" + $(".user").text().split(/\s+/)[0];
                if(code==79){//if the 'o' key is pressed
                    window.location=mainUrl;//go to the overview
                }
                else if(code==67){//if the 'c' key is pressed
                    window.location= mainUrl + "/comments";
                }
                else if(lastEvent.keyCode==83 && code==85){//if the 's' key, then the 'u' key is pressed,
                    window.location=mainUrl + "/submitted";
                }
                else if(code==71){//if the 'g' key is pressed
                    window.location=mainUrl + "/gilded";
                }
                else if(code==85){
                    window.location=mainUrl + "/upvoted";
                }
                else if(code==68){
                    window.location=mainUrl + "/downvoted";
                }
                else if(code==74){//if the 'j' key is pressed (because h is already used for home)
                    window.location=mainUrl + "/hidden";
                }
                else if(lastEvent.keyCode==83 && code==65){//if the 's' key then 'a' key is pressed,
                    window.location=mainUrl + "/saved";
                }

            }
            if(window.location.pathname=="/" || window.location.pathname.indexOf("/m/")>-1){//if the page is the homepage or a multireddit page
                if(code>=112 && code<124){//if a function key is pressed;
                    e.preventDefault();
                    $($(".multis").children()[(code-112)]).children()[0].click();//go to that multi
                    //console.log($($(".multis").children()[(code-111)]).children()[0].text())

                }//end of if(code>=112 && code<124
            }//end of if(window.location.pathname=="/" || window.location.pathname.indexOf("/m/")>-1
        }//end of catch(err)
    }//end of else
    lastEvent = e;
});//end of  adding keydown event listener to the document