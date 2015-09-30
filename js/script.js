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
					var empData = localStorage.getItem('jsonArray');
					
					if (empData == null || empData == '') {
						$.ajax({
							url : 'sample.json',
							success : function(data) {
								jsonArray = data;
								localStorage.setItem('jsonArray', JSON.stringify(data));
							}
						});
					}
					else{
						jsonArray = JSON.parse(empData);
					}
					for ( var i in jsonArray) {
						// sort data
						jsonArray.sort(function(el1,el2){
							  return alphabetSort(el1, el2, "name")
						});
						
						// append data in a table
						
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



function saveData(){
	var name = $('#name').val();
	var designation = $('#designation').val();
	var avatar = $('#cam_photo').attr('src');
	jsonArray.push({'name':name, 'designation':designation, 'avatar' : avatar});
	
	jsonArray.sort(function(el1,el2){
		  return alphabetSort(el1, el2, "name")
	});
	
	// store in localstorage
	localStorage.setItem('jsonArray', JSON.stringify(jsonArray));
	
	
	
	
	
	$('#emp-list').empty();
	$('#emp-table tr').show();
	$('form#booking-form').each(function() {
		this.reset();
	});
	$('#adBtn,#form-row').hide();
	
	for (var i=0; i < jsonArray.length; i++){
		var tableRow = '<tr>'
			+ '<td width="15%" ><img class="img-responsive avatar" src="'
			+ jsonArray[i].avatar
			+ '"></td>'
			+ '<td  class="text-left"><span class="name">'
			+ jsonArray[i].name
			+ '</span><p class="text-mute">'
			+ jsonArray[i].designation
			+ '</p></td>' + '</tr>';
		$('#emp-list').append(tableRow);
	}
	
	
	
	
}

