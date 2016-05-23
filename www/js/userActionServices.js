function testDbConnect(messageid){
    $.ajax({
        type: "post",
        url: "/php/test.php",
        data: {
            messageid: messageid
        },
        dataType: "json",
        success: function(dataCheck) {
            void 0



            //$("#users-profile").css("height",$("#userProfileImage").height());
        }
    });
}

testDbConnect()