//variables
var buttonStatus, fname, lname, cnum;

$(document).ready(function(){
	fillData();
});//content loading

$("#content").on("click", '#add', function(){

	buttonStatus = 'add';
	fname = $("#fname").val();
	lname = $("#lname").val();
	cnum = $("#cnum").val();

	if(fname && lname && cnum !== ''){
		if (confirm('Are you sure you want to save this contact?')) {
		    $.post("main.php",
			{
				buttonstatus: buttonStatus,
				fname: fname,
				lname: lname,
				cnum: cnum
			},
			function(){
				setTimeout(function(){
					fillData();
					alert('Contact added successfully!');
				}, 400);
			});
		} else {
		    $("#fname").val('');
			$("#lname").val('');
			$("#cnum").val('');
		}
	} else {
		alert('Required fields cannot be empty!');
	}

}); //addbtn function

$('#content').on('keyup', '.nfield', function() {

	var num = $(this).val();

	if(!num.match(/^[0-9]*$/)){
		$(this).val(num.substr(0, num.length - 1));
		alert('Letters are not allowed!');
		
	} else if(num.length > 11){
		$(this).val(num.substr(0, num.length - 1));
		alert('Contact number should only be 11 digits.');
	}

}); //validation for numberfield

$('#content').on('input', '.tfield', function() {

	var text = $(this).val();

	if(!text.match(/^[A-Za-z]*$/)){
		$(this).val(text.substr(0, text.length - 1));
		alert('Numbers or space are not allowed!');
	} else if (text.length > 30){
		$(this).val(text.substr(0, text.length - 1));
		alert('Name fields should only contain 30 characters or less.');
	}

}); //validation for textfield

$("#search").on('input', function() {

	var filter, rows, data;
	filter = $(this).val().toLowerCase();
	rows = $("#content").find('tr');

	rows.each(function(){
		data = $(this);
		data.toggle(data.html().toLowerCase().indexOf(filter) > -1);
	});

});

function fillData(){
	$.get("main.php", function(data){

		var jsonData = JSON.parse(data);
		var table = '';

		if(jsonData.length > 0){
			$.each(jsonData, function(index){
				table += ('<tr><td><input type="text" class="tfield" id="fname'+jsonData[index].id+'" value="'+jsonData[index].firstname+'" readonly></td><td><input type="text" class="tfield" id="lname'+jsonData[index].id+'" value="'+jsonData[index].lastname+'" readonly></td><td><input type="text" class="nfield" id="cnum'+jsonData[index].id+'" value="0'+jsonData[index].contact_number+'" readonly></td><td><input type="button" id="edit'+jsonData[index].id+'" value="edit" onclick="editBtn('+jsonData[index].id+')"><input type="button" id="delete'+jsonData[index].id+'" value="delete" onclick="deleteBtn('+jsonData[index].id+')"></td></tr>');
			});
		} else {
			$("#content").html('<tr><td colspan="4">0 results</td></tr>');
		}
		
		$("#content").html(table);
		$("#content").append('<tr><td><input class="tfield" id="fname" type="text" placeholder="Type First name here"></td><td><input class="tfield" id="lname" type="text" placeholder="Type Last name here"></td><td><input class="nfield" id="cnum" type="text" placeholder="Type Number here"></td><td><input id="add" type="button" value="Save Contact"></td></tr>');
	});
}//fill tables

function editBtn (id) { 

	var button = $("#edit"+id).val();

	if(button == 'edit'){
		$("#fname"+id).prop("readonly", false);
		$("#lname"+id).prop("readonly", false);
		$("#cnum"+id).prop("readonly", false);
		$("#edit"+id).val('drop');
		$("#delete"+id).val('save');
		$("#fname").prop("readonly", true);
		$("#lname").prop("readonly", true);
		$("#cnum").prop("readonly", true);
		$("#add").prop("readonly", true);
		$('input[type="button"][value="edit"]').prop("disabled", true);
		$('input[type="button"][value="delete"]').prop("disabled", true);
		$('input[type="button"][value="Save Contact"]').prop("disabled", true);
		$("#fname"+id).focus().select();
	} else {
		$("#fname"+id).prop("readonly", true);
		$("#lname"+id).prop("readonly", true);
		$("#cnum"+id).prop("readonly", true);
		$("#edit"+id).val('edit');
		$("#delete"+id).val('delete');
		setTimeout(function(){
			fillData();
			alert('No changes made.');
		}, 400);
	}
}//dynamic edit buttons

function deleteBtn (id) { 

	var button = $("#delete"+id).val();
	fname = $("#fname"+id).val();
	lname = $("#lname"+id).val();
	cnum = $("#cnum"+id).val();

	if(button == 'delete'){
		
		buttonStatus = 'delete';

		if (confirm('Are you sure you want to delete contact?')) {
		    $.post("main.php",
			{
				buttonstatus: buttonStatus,
				id: id
			},
			function(){
				setTimeout(function(){
					fillData();
					alert('Contact deleted successfully!');
				}, 400);
			});
		}
	} else {

		buttonStatus = 'edit';

		if (confirm('Are you sure you want to update contact?')) {
		    $.post("main.php",
			{
				buttonstatus: buttonStatus,
				fname: fname,
				lname: lname,
				cnum: cnum,
				id: id
			},
			function(){
				setTimeout(function(){
					fillData();
					alert('Contact updated successfully!');
				}, 400);
			});
		}
	}
} //dynamic delete buttons