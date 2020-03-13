<!DOCTYPE html>
<head>
	<title>Phone Book</title>
</head>
<body>
	<table border="2">
        <thead>
            <tr>
                <th colspan="4">Tim's Phonebook</th>
            </tr>
            <tr>
                <th colspan="4"><input type="text" id="search" placeholder="Search Contact..."></th>
            </tr>
            <tr>
                <td>First Name</td>
                <td>Last Name</td>
                <td>Contact Number</td>
                <td>Options</td>
            </tr>
        </thead>
        <tbody id="content">
        </tbody>
    </table>
</body>
<script src='jquery-3.4.1.min.js'></script>
<script src='phonebook.js'></script>
</html>