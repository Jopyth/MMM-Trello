# Module: Trello
The `Trello` module displays all cards in a specific [Trello](https://trello.com/) list, in a style similar to the [Newsfeed](https://github.com/MichMich/MagicMirror/tree/master/modules/default/newsfeed) (showing one card at a time).
Applications can be: displaying a TODO list, showing notes, or important information which needs to be shared between roommates.

![Your card on trello.com](/.github/trellocard.png?raw=true)
![Your card on the mirror](/.github/mirrorcard.png?raw=true)

## Installation

  1\. Execute the following commands from your `MagicMirror/modules` folder:
```bash
git clone https://github.com/Jopyth/MMM-Trello.git # clone this repository
cd MMM-Trello # navigate into the folder
npm install # install dependencies
```
  2\. Add the module to your `config/config.js` file (see below for details).

## Using the module

To use this module you will need a trello API Key, an access token, and your list identifier.

Get your required API Key and Token [here](https://trello.com/app-key), or see 'Configuration Options' for more details.
Also find your list id as described [here](https://developers.trello.com/get-started/start-building#create) below *Finding a List ID*.

Then, add it to the modules array in the `config/config.js` file:
````javascript
    {
        module: 'MMM-Trello',
        position: 'bottom_center', // This can be any of the regions, best results in center regions.
        config: {
            // See 'Configuration options' for more information.
            api_key: "INSERT_YOUR_API_KEY",
            token: "INSERT_YOUR_TOKEN",
            list: "INSERT_YOUR_LIST_ID"
        }
    },
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
			<td>The id of the list you want to display, check out the section <a href="#finding-a-list-id">Finding a List ID</a>.
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
    <tr>
      <td><code>showDescription</code></td>
      <td>Whether to show the description of the card.<br>
        <br><b>Possible values:</b> <code>true</code> or <code>false</code>
        <br><b>Default value:</b> <code>true</code>
      </td>
    </tr>
			<td><code>isCompleted</code></td>
			<td>If list symbolizes a set of completed tasks then<br>enabling this option will strike-out titles.<br>
				<br><b>Possible values:</b> <code>true</code> or <code>false</code>
				<br><b>Default value:</b> <code>false</code>
			</td>
		</tr>
		<tr>
			<td><code>showLineBreaks</code></td>
			<td>Display line breaks in the description? Needs more space if true.<br>
				<br><b>Possible values:</b> <code>true</code> or <code>false</code>
				<br><b>Default value:</b> <code>false</code>
			</td>
		</tr>
		<tr>
			<td><code>showDueDate</code></td>
			<td>Whether to show the due date of cards, if they have one.<br>
				<br><b>Possible values:</b> <code>true</code> or <code>false</code>
				<br><b>Default value:</b> <code>true</code>
			</td>
		</tr>
		<tr>
			<td><code>showChecklists</code></td>
			<td>Whether to show checklists of cards.<br>
				<br><b>Possible values:</b> <code>true</code> or <code>false</code>
				<br><b>Default value:</b> <code>true</code>
			</td>
		</tr>
		<tr>
			<td><code>showChecklistTitle</code></td>
			<td>Whether to show the title of each checklist before the actual check list.<br>
				<br><b>Possible values:</b> <code>true</code> or <code>false</code>
				<br><b>Default value:</b> <code>false</code>
			</td>
		</tr>
		<tr>
			<td><code>wholeList</code></td>
			<td>For Trello list containing only simple title only cards, it may be more appropriate to see the full list of cards rather than one at a time.  Setting <code>wholeList</code> to <code>true</code> will show all cards in the list at the same time.  This will be ugly for complex cards.<br>
				<br><b>Possible values:</b> <code>true</code> or <code>false</code>
				<br><b>Default value:</b> <code>false</code>
			</td>
		</tr>
	</tbody>
</table>

## Finding a List ID

Copied from the [Trello API docs](https://developers.trello.com/get-started/start-building):

> One of the trickier parts of using the Trello API for simple use cases is finding a List ID that belongs to a user. There are a few ways of doing this depending on your skillsets. One such way is to use the Chrome Dev Tools to watch network traffic from the official client.
>
> To try to make this easy, we'll be dumping the JSON from a known Card. Open the official Trello web client and find a Card from a list that you want to use as your target.
>
> It should have a short URL that looks like
>
> https://trello.com/c/DcqBrqdx/1-target-card
> Take that URL and add .json to the end as follows:
>
> https://trello.com/c/DcqBrqdx/1-target-card.json
> Within the raw JSON dump you get when pulling up this new URL, you will see a field called **idList**.

Make sure you get the id after **idList** (use the search function of your browser - usually accessible with CTRL + F).
The first **id** in the *.json* is not the id of the list you are searching for, it is the id of the card.

## FAQ:

### I have a weird error, what should I do?

Please check below if this is a known error, if not, feel free to post in the [Troubleshooting Section](https://forum.magicmirror.builders/category/29/troubleshooting) of the Forum.

|Error|Possible Solution|
|-----|-----|
| Error 404(Not Found): model not found | This can happen when you accidentally take the wrong id. Go through **Finding a list id** [here](#finding-a-list-id) again. Make sure to look for the cryptic number after **idList**, and do not take the first id (that is the card id) in the *.json*.  |
| Error 400(api_key is empty) | Enter your api_key (see Configuration Options). |
| Error 400(Bad Request) invalid id | Your list id is not correct. Maybe you forgot a symbol? |
| Error 401(Unauthorized) unauthorized board permission requested | Something is wrong with your token (see [Configuration Options](#configuration-options)). |

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
