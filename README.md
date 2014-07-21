#Simpleprompt

Simple jQuery plugin for tabbed content

##Usage

Run plugin on html structure similar to one bellow

```javascript
$('.tabModule').tabber();
```
```html
<div class="tabModule">
	<div class="tab">
		<h3>Tab title</h3>
		<div class="tabContent">
			Tab1 content
		</div>
	</div>
	<div class="tab">
		<h3>Tab title</h3>
		<div class="tabContent">
			Tab2 content
		</div>
	</div>
	<div class="tab">
		<h3>Tab title</h3>
		<div class="tabContent">
			Tab3 content
		</div>
	</div>
</div>
```

##Available options / defaults

```javascript
$.tabber.defaults = {
	'tabBtnClass': 'btn',
	'tabBtnSelector': '.btn',
	'tabBtnActiveClass': 'active',
	'tabBtnTitleSelector': 'h3',

	'navDefined': false,
	'tabNavClass': 'tabNav',
	'tabNavTag': 'div',
	'tabSelector': '.tab',
	'tabActiveClass': 'active',
	'numTabsClassPrefix': 'numTabs',

	'afterInit': null,
	'afterTabChange': null,
	'afterNavRender': null,
	'afterRender': null
};
```