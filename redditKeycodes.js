
/*
Copyright 2015

This file is part of Reddit Shortcut Keys.
Reddit Shortcut Keys is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
Reddit Shortcut Keys is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
You should have received a copy of the GNU General Public License
along with Reddit Shortcut Keys.  If not, see <http://www.gnu.org/licenses/>.
*/
$(".rank").each(function(){
    $(this).text($(this).text().substring($(this).text().length-1));
    $(this).attr("picked", "false");
});
lastRootIndex = 0;
$rootComments=[]
$firstRoot = $($(".comment")[0]);
$(".comment").each(function(){
    $(this).attr("selectedComment","false");
    //this method doesn't work, because comments whose parent has been deleted will also satisfy this condition
    /*var $currentButtonClass = $($(this).children(".entry").children(".flat-list").children()[2]).attr("class");
    if($currentButtonClass!==undefined){//if the third button in the flat-list bar has a class, it is a root comment, so add it to the root comments array (the li element that contains the 'parent' link does not have a class, which is the third element in non-root comments)*/ 
    /*if($(this).offset().left<=20 && $(this).offset().left>0){//this isn't perfect either, but it should be all-or-nothing; either /r works for searching, or it doesn't. Pinpointing the 'definition' of a root comment is difficult, and the position test doesn't always work because each subreddit positions their comments differently
        $rootComments.push($(this));
    }*/
    if($(this).offset().left==$firstRoot.offset().left){
        $rootComments.push($(this));
    }
});

/**
* This method loops through all elements in $rootComments and compares their DOM node with the passed in DOM node.
* @param ele a DOM node
* @return true if ele matches a DOM node in $rootComment, false otherwise
*/
function checkInRootComments(ele){
    for(i=0;i<$rootComments.length;i++){
        if($rootComments[i][0]==ele){
            return true;
        }
    }
    return false;
}
for(i=0;i<$rootComments.length;i++){//this loop numbers root comments, for easy navigation after leaving the page
   if(window.location.pathname.indexOf("comments")>-1){
       $rootComments[i].children(".entry").children(".tagline").append("<span style='color:red'>"+(i+1)+"</span>")
   }
}
var commentSelected = -1;
lastEvent = new Object();
lastEvent.keyCode=0;
$(document).on("keydown",function(e){
    var code = e.keyCode;
    console.log(code);

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
                else if(code==67 && window.location.pathname.indexOf("comments")>-1){//if the 'c' key is pressed on a comments page
                    e.preventDefault();
                    if($("#commentSelector").length<1){//if the commentSelector div doesn't exist yet
                        //create it
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
                                for(i=0;i<$(".comment").length;i++){
                                    $($(".comment")[i]).attr("selectedComment","false");
                                }
                                var commentNum = parseInt($inputbox.val().substring(1));//get the contents of the div
                                commentSelected = commentNum-1;
                                console.log("Comment Num: " + commentNum);
                                window.scrollTo(0,$($(".comment")[commentNum-1]).offset().top);//scroll to the x-coordinate of the selected comment
                                $($(".comment")[commentNum-1]).attr("selectedComment","true");
                                $inputbox.val("+");
                                $inputbox.blur();
                            }
                        });
                        $inputbox.css("z-index","100");
                        $("body").append($inputbox);
                        $inputbox.focus();
                    }//end of if($("#commentSelector").length<1)
                    else{//otherwise just focus on it
                        $("#commentSelector").focus();
                    }
                }
                else if(code==82 && window.location.pathname.indexOf("comments")>-1){// if on a comments page and the 'r' key is pressed
                    e.preventDefault();
                    if($("#rootSelector").length<1){//if the rootSelector div doesn't exist yet
                        //create it
                        $inputbox = $("<input></input>");
                        $inputbox.attr("id","rootSelector");
                        $inputbox.attr("type","text");
                        $inputbox.css("position","relative");
                        $inputbox.val("+");
                        $inputbox.css("left",0);
                        $inputbox.on("input",function(){if($inputbox.val().length===0){
                            $inputbox.val("+");
                        }});
                        $inputbox.on("keydown",function(q){
                            if(q.keyCode==13){//if the enter key is pressed
                                for(i=0;i<$(".comment").length;i++){
                                    $($(".comment")[i]).attr("selectedComment","false");
                                }
                                var commentNum = parseInt($inputbox.val().substring(1));//get the contents of the div
                                commentSelected = commentNum-1;
                                console.log("Root Comment Num: " + commentNum);
                                //window.scrollTo(0,$($(".comment")[commentNum-1]).offset().top);//scroll to the x-coordinate of the selected comment
                                lastRootIndex = commentSelected;
                                window.scrollTo(0,$rootComments[commentSelected].offset().top);//scroll to the x-coordinate of the selected comment
                                $rootComments[commentSelected].attr("selectedComment","true");
                                $("[selectedcomment='true']").children(".entry").children("form").children("div").children("div").children().append("<span name='commentStar' style='color:#FF0000'> *</span>")
                                $inputbox.val("+");
                                $inputbox.blur();
                            }
                        });
                        $inputbox.css("z-index","100");
                        $("body").append($inputbox);
                        $inputbox.focus();
                    }//end of if($("#commentSelector").length<1)
                    else{//otherwise just focus on it
                        $("#rootSelector").focus();
                    }
                }
                else if(code==68){//if the 'd' key is pressed
                    e.preventDefault();
                    $inputbox = $("<input></input>");
                    $inputbox.attr("id","domainSelector");
                    $inputbox.attr("type","text");
                    $inputbox.css("position","relative");
                    $inputbox.val("+");
                    $inputbox.css("left",0);
                    $inputbox.on("input",function(){if($inputbox.val().length===0){
                        $inputbox.val("+");
                    }});
                    $inputbox.on("keydown",function(q){
                        if(q.keyCode==13){
                            window.location="https://www.reddit.com/domain/" + $("#domainSelector").val().substring(1);
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
                else if($("[selectedComment='true']").length>0){//if a 'selected comment' exists
                    e.preventDefault();
                    if(code==33){
                        $("[selectedcomment='true']").children(".midcol").children("[data-event-action='upvote']").click()
                    }
                    else if(code==34){
                        $("[selectedcomment='true']").children(".midcol").children("[data-event-action='downvote']").click()
                    }
                }
            }//end of else if(code==33 || code==34)
            /* else if(code==67){
                if($(".last-clicked").length>0){
                  //  $(".last-clicked").children(".entry").children(".flat-list").children(".first").children("a")[0].click()
                }
            }*/
            else if(code==80){//if the 'p' key is pressed
                ///This code works, but only properly for linear trees, see README for more information
                /*if($("[selectedcomment='true']").length>0){//if a selected comment exists
                    $selComment = $("[selectedcomment='true']")
                    if(!checkInRootComments($selComment[0])){//if the selected comment is NOT a root comment
                        $($selComment.children(".entry").children(".flat-list").children()[2]).children()[0].click();//click on the parent link
                        $selComment.attr("selectedcomment","false");//de-select the child comment
                        commentSelected--;
                        $($(".comment")[commentSelected]).attr("selectedcomment","true");//select the parent comment
                    }else{
                        console.log("rootComment");
                    }
                }*/
            }
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
            if(code==83 && window.location.pathname.indexOf("/comments/")>-1){//if the user presses the 's' key on a comments page
                if($("[selectedcomment=true]").length>0){//if a selected comment exists
                    len = $rootComments.length-1;
                    if(lastRootIndex+1>len){//if its the last selected comment
                        $lastEle = $rootComments[$rootComments.length-1];//get the last root comment
                        window.scrollTo(0,$lastEle.offset().top);//scroll to it
                        $(".comment").each(function(){
                            $(this).attr("selectedcomment","false");
                        });
                         $("[name='commentStar']").each(function(){
                            $(this).remove();
                        });
                        $lastEle.attr("selectedcomment","true");//make it the selected comment
                        $("[selectedcomment='true']").children(".entry").children("form").children("div").children("div").children().append("<span name='commentStar' style='color:#FF0000'> *</span>")                        
                        //$("[selectedcomment='true']").children(".entry").children("form").children("div").children("div").children().prepend("<span name='rootCommentIndex' style='color:#FF0000'>" + lastRootIndex+". </span>")
                        $lastEle.focus();//focus on it
                    }
                    else{
                        lastRootIndex++;
                        $selComment = $rootComments[lastRootIndex];
                        $(".comment").each(function(){
                            $(this).attr("selectedcomment","false");
                        });
                        $("[name='commentStar']").each(function(){
                            $(this).remove();
                        });
                        $selComment.attr("selectedcomment","true");
                        $("[selectedcomment='true']").children(".entry").children("form").children("div").children("div").children().append("<span name='commentStar' style='color:#FF0000'> *</span>")
                        // $("[selectedcomment='true']").children(".entry").children("form").children("div").children("div").children().prepend("<span name='rootCommentIndex' style='color:#FF0000'>" + lastRootIndex+". </span>")
                        window.scrollTo(0,$selComment.offset().top);
                        $selComment.focus();
                    }
                }
                else{//if there is no selected comment
                    lastRootIndex=0;
                    $rootComments[0].attr("selectedcomment","true");
                    $("[selectedcomment='true']").children(".entry").children("form").children("div").children("div").children().append("<span name='commentStar' style='color:#FF0000'> *</span>")
                    //$("[selectedcomment='true']").children(".entry").children("form").children("div").children("div").children().prepend("<span name='rootCommentIndex' style='color:#FF0000'>" + lastRootIndex+". </span>")
                    window.scrollTo(0,$rootComments[0].offset().top);
                    $rootComments[0].focus();
                }
            }
            if(code==87 && window.location.pathname.indexOf("/comments/")>-1){//if the user presses the 'w' key on a comments page
                if($("[selectedcomment=true]").length>0){//if a selected comment exists
                    if(lastRootIndex-1<0){//if its the first selected comment
                        lastRootIndex=0;
                        $lastEle = $rootComments[0];//get the first root comment
                        window.scrollTo(0,$lastEle.offset().top);//scroll to it
                        $(".comment").each(function(){
                            $(this).attr("selectedcomment","false");
                        });
                        $("[name='commentStar']").each(function(){
                            $(this).remove();
                        });
                        $lastEle.attr("selectedcomment","true");//make it the selected comment
                        $("[selectedcomment='true']").children(".entry").children("form").children("div").children("div").children().append("<span name='commentStar' style='color:#FF0000'> *</span>")
                        $lastEle.focus();//focus on it
                    }
                    else{
                        lastRootIndex--;
                        $selComment = $rootComments[lastRootIndex];
                        $(".comment").each(function(){
                            $(this).attr("selectedcomment","false");
                        });
                         $("[name='commentStar']").each(function(){
                            $(this).remove();
                        });
                        $selComment.attr("selectedcomment","true");
                        $("[selectedcomment='true']").children(".entry").children("form").children("div").children("div").children().append("<span name='commentStar' style='color:#FF0000'> *</span>")                       
                        window.scrollTo(0,$selComment.offset().top);
                        $selComment.focus();
                    }
                }
                else{//if there is no selected comment, go to the first root comment
                    lastRootIndex=0;
                    $rootComments[0].attr("selectedcomment","true");
                    $("[selectedcomment='true']").children(".entry").children("form").children("div").children("div").children().append("<span name='commentStar' style='color:#FF0000'> *</span>")                                           
                    window.scrollTo(0,$rootComments[0].offset().top);
                    $rootComments[0].focus();
                }
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
            if($("[selectedcomment='true']").length>0 && code==65){//if a comment is selected and the 'a' key is pressed,
             //   $("[selectedcomment='true']").children(".entry").children(".usertext").children(".usertext-body").children().children().children()[0].click(); //click the link in the comment. Coming soon
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