# Module: Trello
The `Trello` module displays all cards in a specific Trello list.
Applications could be: displaying a TODO list, showing notes, or important information which needs to be shared between roommates.
Get your required API Key and Token [here](https://trello.com/app-key), or see 'Configuration Options' for more details.
Also find your list id as described [here](https://developers.trello.com/get-started/start-building#create) below *Finding a List ID*.

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
    {
        module: 'MMM-Trello',
        position: 'bottom_center', // This can be any of the regions, best results in center regions.
        config: {
            // See 'Configuration options' for more information.
            api_key: "INSERT_YOUR_API_KEY",
            token: "INSERT_YOUR_TOKEN",
            list: "INSERT_YOUR_LIST_ID"
        }
    }
]
````

## Configuration options

The following properties can be configured:


<table width="100%">
	<!-- why, markdown... -->
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>
		<tr>
			<td><code>api_key</code></td>
			<td>Your trello API key, get it <a href="https://trello.com/app-key">here</a>.
				<br> <br> This value is <b>REQUIRED</b>
			</td>
		</tr>
		<tr>
			<td><code>token</code></td>
			<td>Your trello token, get it via this link (replace <code>API_KEY</code> with your API key!): <code>https://trello.com/1/authorize?expiration=never&scope=read&response_type=token&name=Server%20Token&key=API_KEY</code>.
				<br> <br> This value is <b>REQUIRED</b>
			</td>
		</tr>
		<tr>
			<td><code>list</code></td>
			<td>The id of the list you want to display, check out <b>Finding a List ID</b> <a href="https://developers.trello.com/get-started/start-building#create">here</a>.
				<br> <br> This value is <b>REQUIRED</b>
			</td>
		</tr>
		<tr>
			<td><code>reloadInterval</code></td>
			<td>How often does the content need to be fetched (in ms)?<br>
				<br><b>Possible values:</b> any <code>int</code> or <code>float</code>
				<br><b>Default value:</b> <code>5 * 60 * 1000</code> (every 10 minutes)
			</td>
		</tr>
		<tr>
			<td><code>updateInterval</code></td>
			<td>How long should a card be displayed, before switching to the next one (in ms)?<br>
				<br><b>Possible values:</b> any <code>int</code> or <code>float</code>
				<br><b>Default value:</b> <code>10 * 1000</code> (every 10 seconds)
			</td>
		</tr>
		<tr>
			<td><code>animationSpeed</code></td>
			<td>Duration of the fade in and fade out effect in ms.<br>
				<br><b>Possible values:</b> any <code>int</code> or <code>float</code>
				<br><b>Default value:</b> <code>2.5 * 1000</code> (2.5 seconds)
			</td>
		</tr>
		<tr>
			<td><code>showTitle</code></td>
			<td>Whether to show the title of the card.<br>
				<br><b>Possible values:</b> <code>true</code> or <code>false</code>
				<br><b>Default value:</b> <code>true</code>
			</td>
		</tr>
	</tbody>
</table>

The MIT License (MIT)
=====================

Copyright © 2016 Joseph Bethge

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

**The software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.**
