// JavaScript Document


/**
 * This function pulls the ImageFinder view page at /imagefinder.
 */
function get(url){

	var body;

	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, false);// 'false' (synchronous js) is deprecated, but asynchronous doesn't work

	xhr.onreadystatechange = function(){
		if(xhr.readyState < 4){
			explain_url = 'Loading Images…'
		}
		if(xhr.readyState === 4 && xhr.status === 200){
			body = get_body(xhr.responseText);
		}
	}
	xhr.send();
	return body;
}

/**
 * Returns the actual content from httpGet().
 */
function get_body(content) {
   var x = content.indexOf("<main");
   x = content.indexOf(">", x);
   var y = content.lastIndexOf("</main>");
   return content.slice(x + 1, y);
}

/**
 * Modify the Image URL field in the dialog box.
 */
function img_url(value, element){

	var field = document.querySelector('input.cke_dialog_ui_input_text');
	field.value = value;

	link_select(element);
}

/**
 * Handle the highlighting of the selected image.
 */
function link_select(element){

	// Find the selected thumbnail
	var selected = document.querySelector('a.bg-image.selected');

	// Unhighlight the currently selected image if the is one
	if(selected){
		selected.classList.remove('selected');

		// Change the <IMG> border color
		selected.children[0].style.borderColor = "#FFF";
	}

	// Change the selected <IMG> border to green
	var link = document.getElementById(element);
	var bg_image = link.children[0];
	link.classList.add('selected');
	bg_image.style.borderColor = '#0F0';
}

/**
 * This function returns the HTML for the div that displays the images.
 */
function add_images(){

	//'finder' turns the returned string into a DOM so that we can traverse it.
	var finder = new DOMParser().parseFromString(get('/imagefinder'), 'text/html');

	// 'images' is the Nodelist of DIVS containing images that appear in the dialog.
	// The vital information we need for functions is carried by the DIV, not the image itself.
	var images = finder.querySelectorAll('.image-finder');

	// Create the div that will contain the group of images
	var div = document.createElement('div');
	div.id = 'finder';
	div.style.height = '250px';
	div.style.overflowY = 'scroll';
	div.style.borderWidth = '1px';
	div.style.borderStyle = 'solid';
	div.style.padding = '8px';
	div.style.marginBottom = '.5rem';

	// Manipulate the items containing the image elements for display
	for(var i = 0; i < images.length; i++){

		// Style the <DIV> wrapping the <IMG>
		images[i].style.float = 'left';
		images[i].style.padding = '.25rem';

		// Create the <A> element for click function needs
		var a = document.createElement('a');
		a.id = 'fid-' + images[i].dataset.fid;
		a.className = 'bg-image';

		// Adding an 'onclick' attribute doesn't seem to work
		// nor does adding an Event Listener
		a.href = 'javascript:img_url(\'' + images[i].dataset.url + '\',\'' + a.id + '\')';

		// Append the <A> element to the <DIV>
		images[i].appendChild(a);

		// Move the <IMG> inside the <A> tag
		a.appendChild(images[i].children[0]);

		// Add the whole unit to the collection
		div.appendChild(images[i]);
	}

	return div.outerHTML;
}

/**
 * Create the explaination for the Image Selector.
 */
function inst_imageSelector(url){

	var explain_url = '';
	explain_url += add_images(url);// Add the image collection first.

	explain_url += '<div class="instructions">';
	explain_url += '<p>Select an image to use as a background by clicking it.</p>';
	explain_url += '</div>';

	return explain_url;
}

/**
 * Create the explanation for Opacity settings.
 */
function inst_opacity(){
	var explain_opac = '';

	explain_opac += '<div class="instructions">';
	explain_opac += '<p>Opacity is a measure of transparency.<br />';
	explain_opac += 'Adjust the opacity in percentage from 0 (invisible) to 100 (completely opaque).</p>';
	explain_opac += '<p>Reducing|Increasing the opacity of an image|overlay helps with readability of the text.</p>';
	explain_opac += '</div>';

	return explain_opac;
}

/**
 * Create the explanation for the Vertical Position settings.
 */
function inst_verPos(){
	var explain_verpos = '';

	explain_verpos += '<div class="instructions">';
	explain_verpos += '<p>You can move the background image up or down from the default position within the frame.</p>';
	explain_verpos += '<ul style="margin-left:1rem;">';
	explain_verpos += '<li>Smaller numbers (including negative numbers) will move the image UP.</li>';
	explain_verpos += '<li>Larger numbers will move the image DOWN.</li>';
	explain_verpos += '</ul>';
	explain_verpos += '</div>';

	return explain_verpos;
}

/**
 * Verifies whether a field value already exists (edit) or if the default value should be used (create).
 */
function verify_value( widget, element, prop ){

	var data = widget.data[prop];

	if(data){
		if(prop === 'backgroundPositionY'){
			var data_str = /(\-?\d+)px/;
			var pixels = data_str.exec(data);
			data = pixels[1];
		}
 		return data;
	}
	else{
		return element.getValue();
	}
}

CKEDITOR.dialog.add( 'section', function( editor ) {
	return {
        title: 'Section Widget',
        minWidth: 450,
        minHeight: 100,
        onLoad: function(){

		},

		contents: [
            {
                id: 'background_image',
				label:'Background Image',
                elements: [
					{
						id: 'backgroundImage',
						type: 'text',
						label: '<strong>Image URL</strong>',
						width: '300px',
						setup: function( widget ) {
							this.setValue( widget.data.backgroundImage );

							var bgimgs = document.querySelectorAll('a.bg-image img');
							var bgurl = widget.data.backgroundImage;

							// Hightlight the border around the selected image
							bgimgs.forEach(function(image){
								image.style.borderColor = "#FF0";
								image.style.borderWidth = "2px";
								image.style.borderStyle = "solid";
								if(image.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.url === bgurl){
									image.style.borderColor = '#0F0';
									image.parentElement.classList.add('selected');
								}else{
									image.style.borderColor = '#FFF';
								}
							});
						},
						commit: function( widget ) {
							widget.setData( 'backgroundImage', this.getValue() );
						}
					},
                     {
						type:'html',
						html: inst_imageSelector('/imagefinder'),
					},
                  {
                    id: 'background_attachment',
                    type: 'select',
                    label: 'Background Attachment',
                    items: [ ['Scroll', 'scroll'], ['Fixed', 'fixed'] ],
                    'default': 'scroll',
                    setup: function ( widget ) {
                      this.setValue( verify_value( widget, this, 'background_attachment'));
                    },
                    commit: function( widget ){
                      widget.setData( 'background_attachment', this.getValue());
                    }
                  },
					{
						id: 'backgroundPositionY',
						type: 'text',
						label: '<strong>Image Top (px)</strong>',
						suffix: 'px',
						width: '50px',
						'default': '50',
						setup: function( widget ) {
							this.setValue( verify_value( widget, this, 'backgroundPositionY' ) );
						},
						commit: function( widget ) {
							widget.setData( 'backgroundPositionY', this.getValue() + 'px' );
						}
					},
                   {
						type:'html',
						html: inst_verPos(),
					},
					{
						id: 'opacity',
						type: 'text',
						label: '<strong>Image Opacity (%)</strong>',
						width: '35px',
						'default': '20',
						align: 'right',
						setup: function( widget ) {
							this.setValue( verify_value( widget, this, 'opacity' ) );
						},
						commit: function( widget ) {
							widget.setData( 'opacity', this.getValue() / 100 );
						}
					},
                    {
						type:'html',
						html: inst_opacity(),
					}

                ]
			},
			{
				id:'overlay_color',
				label:'Overlay',
				elements:[
					{
						id: 'overlayColor',
						type: 'select',
						label: '<strong>Overlay Color</strong>',
						items: [
							['Black', 'rgb(0, 0, 0)'],
							['White', 'rgb(255, 255, 255)'],
							['UNT Green', 'rgb(0, 133, 62)'],
							['Light Green', 'rgb(114, 184, 62)'],
							['Dark Green', 'rgb(0, 106, 49)'],
							['Beige', 'rgb(229, 219, 174)'],
							['Light Brown', 'rgb(136, 122, 104)'],
							['Dark Brown', 'rgb(82, 48, 27)'],
							['Light Blue', 'rgb(132, 177, 205)'],
							['Aqua', 'rgb(0, 130, 101)'],
							['Mellow Yellow', 'rgb(193, 210, 45)'],
							['Limey Yellow', 'rgb(192, 219, 55)'],
						],
						'default': 'rgb(0, 133, 62)',
						setup: function( widget ) {
							this.setValue( verify_value( widget, this, 'overlayColor' ) );
						},
						commit: function( widget ) {
							widget.setData( 'overlayColor', this.getValue() );
						}
					},
					{
						id: 'overlayOpacity',
						type: 'text',
						label: '<strong>Overlay Opacity (%)</strong>',
						width: '35px',
						'default': '20',
						setup: function( widget ) {
							this.setValue( verify_value( widget, this, 'overlayOpacity' ) );
						},
						commit: function( widget ) {
							widget.setData( 'overlayOpacity', this.getValue() / 100 );
						}
					},
                   {
						type:'html',
						html: inst_opacity(),
					},

				]
			},
			{
				id:'text_color',
				label:'Text',
				elements:[
					{
						id: 'color',
						type: 'select',
						label: '<strong>Text Color</strong>',
						items: [
							// ['Black', 'rgb(0, 0, 0)'],
							// ['White', 'rgb(255, 255, 255)'],
              ['Black', 'text-black'],
              ['White', 'text-white']
						],
						'default': 'text-white',
						setup: function( widget ) {
							this.setValue( verify_value( widget, this, 'color' ) );
						},
						commit: function( widget ) {
							widget.setData( 'color', this.getValue() );
						}
					},
				]
			},
			{
				id:'layout',
				label:'Layout',
				elements:[
					{
						id:'columns',
						type:'select',
						label: '<strong>Number of Columns</strong>',
						items: [
							['One-Column', 'one-col'],
							['Two-Column', 'two-col'],
							['Three-Column', 'three-col'],
							['Four-Column', 'four-col']
						],
						'default': 'two-col',
						setup: function ( widget ) {
							this.setValue( verify_value( widget, this, 'columns' ) );
						},
						commit: function( widget ){
							widget.setData( 'columns', this.getValue() );
						}
					},
				]
			}
		],

		onShow: function(){
			var widget = editor.widgets.selected[0];
			console.log(editor.widgets);
			if(widget){
				widget.setData( 'opacity', widget.data.opacity * 100 );
				widget.setData( 'overlayOpacity', widget.data.overlayOpacity * 100 );
			}else{
				var bgiop_default = this.getValueOf('background_image', 'opacity');
				this.getContentElement('background_image','opacity').setValue( bgiop_default );
			}

		},
		onCancel: function(){
			var widget = editor.widgets.selected[0];

			if(widget){
				widget.setData( 'opacity', widget.data.opacity / 100 );
				widget.setData( 'overlayOpacity', widget.data.overlayOpacity / 100 );
			}
		},
		onLoad: function(){

		},
	};
});
