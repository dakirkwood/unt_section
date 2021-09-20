/**
 * Copyright (c) 2014-2016, CKSource - Frederico Knabben. All rights reserved.
 * Licensed under the terms of the MIT License (see LICENSE.md).
 *
 * Simple CKEditor Widget (Part 1).
 *
 * Created out of the CKEditor Widget SDK:
 * http://docs.ckeditor.com/#!/guide/widget_sdk_tutorial_1
 */

// Register the plugin within the editor.
//CKEDITOR.dtd.$editable['div.section'] = 1;
CKEDITOR.plugins.add( 'section', {
	// This plugin requires the Widgets System defined in the 'widget' plugin.
	requires: 'widget',

	// Register the icon used for the toolbar button. It must be the same
	// as the name of the widget.
	icons: 'section',

	// The plugin initialization logic goes inside this method.
	init: function( editor ) {
		// Register the simplebox widget.
		
		editor.widgets.add( 'section', {
			// Allow all HTML elements and classes that this widget requires.
			// Read more about the Advanced Content Filter here:
			// * http://docs.ckeditor.com/#!/guide/dev_advanced_content_filter
			// * http://docs.ckeditor.com/#!/guide/plugin_sdk_integration_with_acf
			allowedContent: 'div(!section)[!style]; div(!background)[!style]; div(!section-content); h2(!section-title); a[!href]',

			// Minimum HTML which is required by this widget to work.
			requiredContent: 'div(section)',

			// Define two nested editable areas.
			editables: {

				backgroundImage:{
					selector: '.background',
					allowedContent:'div(!background)[!style]'
				},
				backgroundPositionY:{
					selector: '.background',
					allowedContent:'div(!background)[!style]'
				},
				/*backgroundColor:{
					selector: '.section',
					allowedContent:'div(!section)[!style]'
				},*/				
				opacity: {
					selector: '.background',
					allowedContent: 'div(!background)[!style]'
				},
				title: {
					// Define a CSS selector used for finding the element inside the widget element.
					selector: '.section-title',
					// Define content allowed in this nested editable. Its content will be
					// filtered accordingly and the toolbar will be adjusted when this editable
					// is focused.
					allowedContent: 'a[!href,name,id,class]; br; em;'
				},
				content: {
					selector: '.section-content',
					allowedContent: 'p; a[!href,name,id,class]; br; ul; ol; li; strong; em; table; tr; td; th; thead; tbody; tfoot; caption',
				}
			},

			// Define the template of a new Simple Box widget.
			// The template will be used when creating new instances of the Simple Box widget.
			template:
				'<div class="widget section">' +
					'<div class="background"></div>' +
					'<h2 class="section-title">Title</h2>' +
					'<div class="section-content"><p>Content</p></div>' +
				'</div>',

			// Define the label for a widget toolbar button which will be automatically
			// created by the Widgets System. This button will insert a new widget instance
			// created from the template defined above, or will edit selected widget
			// (see second part of this tutorial to learn about editing widgets).
			//
			// Note: In order to be able to translate your widget you should use the
			// editor.lang.simplebox.* property. A string was used directly here to simplify this tutorial.
			button: 'Section',

			// Check the elements that need to be converted to widgets.
			//
			// Note: The "element" argument is an instance of http://docs.ckeditor.com/#!/api/CKEDITOR.htmlParser.element
			// so it is not a real DOM element yet. This is caused by the fact that upcasting is performed
			// during data processing which is done on DOM represented by JavaScript objects.
			upcast: function( element ) {
				// Return "true" (that element needs to converted to a Simple Box widget)
				// for all <div> elements with a "simplebox" class.
				return element.name == 'div' && element.hasClass( 'section' );
			},
			dialog: 'section',
			
			//defaults:{ backgroundImage:'/sites/default/files/default_images/widgetBG_default.jpg', backgroundPositionY:'50%', opacity:'.2' },
			
			init: function() {
				var background_image = this.data.backgroundImage;
				//var background_color; = this.data.backgroundColor;
				var background_position = this.data.backgroundPositionY;
				var opacity = this.data.opacity;
				
				if ( background_image ){
					//var background = document.querySelector('.background');
						//background.setAttribute('style', this.data.backgroundImage);
						this.element.backgroundImage = background_image;
						this.setData('backgroundImage', background_image);
					}
				if( background_position ){
						this.element.backgroundPositionY = background_position; 
						this.setData('backgroundPositionY', background_position);					
				}
				/*if( background_color ){
						this.element.backgroundColor = background_color; //console.log(this.element.backgroundImage);
						this.setData('backgroundColor', background_color);					
				}*/
				
				if( opacity ){
						this.element.opacity = opacity; //console.log(this.element.backgroundImage);
						this.setData('opacity', opacity);					
				}
				
			},
			
			data: function() {
				
				//console.log(this.data.backgroundPositionY);
				  ///console.log('A: ' + this.element.backgroundImage);
				  //console.log('B: ' + this.data.backgroundImage);
				delete this.element.backgroundImage;
				delete this.element.backgroundPositionY;
				delete this.element.opacity;
				//delete this.element.backgroundColor;
				  //console.log('C: ' + this.element.backgroundImage);
				  //console.log(this.element.$.children[0]);
				var background_settings = new Array();

				if ( this.data.backgroundImage ){
					background_settings[0] = 'background-image:url(' + this.data.backgroundImage + ')';
					background_settings[1] = 'background-position-y:' + this.data.backgroundPositionY;
					background_settings[2] = 'opacity:' + this.data.opacity + ';' ;
					this.element.$.children[0].setAttribute('style', background_settings.join(';'));
					
					//background.setAttribute('style', this.data.backgroundImage);
					//this.setData('backgroundImage', this.data.backgroundImage);
					//this.setData( 'backgroundImage', this.data.backgroundImage) ;
					//this.element.setAttribute('style', 'background-image:url(' + this.element.backgroundImage + ');');
					//console.log('D: ' + this.element.backgroundImage);

				}
				if ( this.data.backgroundPositionY ){
					
				}
				if ( this.data.opacity ){
					
				}
				
				//console.log( background_settings.join(';') );
				
				
				/*delete this.element.backgroundPositionY;
				if ( this.data.backgroundPositionY ) {
					this.element.$.children[0].setAttribute('style', 'background-position-y:' + this.data.backgroundPositionY + ';');
				}
				delete this.element.backgroundColor;
				if ( this.data.backgroundColor ) {
					this.element.$.children[0].setAttribute('style', 'background-color:' + this.data.backgroundColor + ';');
				}
				delete this.element.opacity;
				if ( this.data.opacity ) {
					this.element.$.children[0].setAttribute('style', 'opacity:' + this.data.opacity + ';');
			}*///console.log('HEY SUCKA!');				}
		}});
		
		editor.execCommand('section');
		editor.ui.addButton('Section',{
			label:'Section',
			command:'section',
			toolbar:''
		});
		CKEDITOR.dialog.add( 'section', this.path + 'dialogs/section.js' );
	}
});