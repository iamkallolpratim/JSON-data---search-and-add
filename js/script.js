$.expr[":"].containsNoCase = function(el, i, m) {
              var search = m[3];
               if (!search) return false;
               return eval("/" + search + "/i").test($(el).text());
           };

var jsonArray = [];

function alphabetSort(el1, el2, index) {
	  return el1[index] == el2[index] ? 0 : (el1[index] < el2[index] ? -1 : 1);
}

$(document)
		.ready(
				function() {
					$
							.ajax({
								url : 'sample.json',
								success : function(data) {
									for ( var i in data) {
										jsonArray = data;
										
										//sort data
										jsonArray.sort(function(el1,el2){
											  return alphabetSort(el1, el2, "name")
										});
										
										//append data in a table
										
										var row = '<tr>'
												+ '<td width="15%" ><img class="img-responsive avatar" src="'
												+ jsonArray[i].avatar
												+ '"></td>'
												+ '<td  class="text-left"><span class="name">'
												+ jsonArray[i].name
												+ '</span><p class="text-mute">'
												+ jsonArray[i].designation
												+ '</p></td>' + '</tr>';

										$('#emp-list').append(row);
									}
								}
							});

				});

function addData() {
	$('#form-row').show();
}


// search on table

$('#search').keyup(function() {
    $('#emp-table tr').hide();
    $('#emp-table tr td:containsNoCase(\'' + $('#search').val() + '\')').parent().show();
    $('#adBtn').show();
    if ($('#search').val().length == 0) {
    	$('#emp-table tr').show();
    }
    if ($('#emp-table tr:visible').length == 0) {
        $('#adBtn').show();
    }
    else{
    	$('#adBtn,#form-row').hide();
    	
    }

});



//show a photo on image div on form
$('#cam_photo').on("click" , function(){
	$('#imgfiles').click();
});

function readURL(input){
	if(input.files[0].size <= 1048576){
	   if (input.files && input.files[0]){
	   		var reader = new FileReader();
	        reader.onload = function (e) {
	            $('#cam_photo').attr('src', e.target.result).height(150).width('100%');
	        };
	        reader.readAsDataURL(input.files[0]);
	    }
	}
	else{
		alert('File is too large. Upload file less than 1MB');
	}
}

