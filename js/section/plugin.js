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
			allowedContent: 'section(!section,text-shadow,text-highlight)[!style]; div(!image)[!style]; div(!color)[!style]; div(!section-content); span; h2(!section-title)[style]; a[!href]; img[!src,alt,style,id]{width,height,float,margin}; iframe[!src,allow,allowfullscreen,frameborder,scrolling];',
//div(!media-box);
			// Minimum HTML which is required by this widget to work.
			requiredContent: 'section(section)',

			// Define two nested editable areas.
			editables: {

				backgroundImage:{
					selector: '.image',
					allowedContent:'div(!image)[!style]; img[!src,alt,style,id]{width,height}',
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
					allowedContent: 'p; a[!href,name,id,class]; br; ul; ol; li; strong; em; table; tr; td; th; thead; tbody; tfoot; caption; img[!src,alt,style,id]{width,height,float,margin};',
				},

				// media: {
				// 	selector: '.section-media',
				// 	allowedContent: 'span; iframe[!src,allow,allowfullscreen,frameborder,scrolling]; img[!src,alt,style,id]{width,height,float,margin};'
				// }//div(!media-box);
			},

			// Define the template of a new Simple Box widget.
			template:			// The template will be used when creating new instances of the Simple Box widget.

				'<section class="widget section two-col text-white">' +
					'<div class="background image"></div>' +
					'<div class="background color"></div>' +
					'<h2 class="section-title">Title</h2>' +
					// '<div class="section-media"></div>' + //<div class="media-box"></div>
					'<div class="section-content"><p>Content</p></div>' +
				'</section>',

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
				return element.name == 'section' && element.hasClass( 'section' );
			},
			dialog: 'section',

			init: function() {
        console.log(this.data);
				var background_image = this.element.$.children[0].style.backgroundImage.split(/[""]/)[1];
				var background_position = this.element.$.children[0].style.backgroundPositionY;
				var background_attachment = this.element.$.children[0].style.backgroundAttachment;
				var opacity = this.element.$.children[0].style.opacity;
				var overlay_color = this.element.$.children[1].style.backgroundColor;
				var overlay_opacity = this.element.$.children[1].style.opacity;
				var text_color = this.element.$.classList[3];

				var columns = this.element.$.classList[2];

				if ( background_image ){
						this.element.$.children[0].style.backgroundImage = background_image;
						this.setData('backgroundImage', background_image);
				}
				if( background_position ){
						this.element.backgroundPositionY = background_position;
						this.setData('backgroundPositionY', background_position);
				}
        if( background_attachment ){
          this.element.backgroundAttachment = background_attachment;
          this.setData('background_attachment', background_attachment);
        }
				if( opacity ){
						this.element.opacity = opacity;
						this.setData('opacity', opacity);
				}
				if( overlay_color ){
						this.element.overlayColor = overlay_color;
						this.setData('overlayColor', overlay_color);
				}
				if ( overlay_opacity ){
						this.element.overlayOpacity = overlay_opacity;
						this.setData('overlayOpacity', overlay_opacity);
				}
				if( text_color ){
						this.element.color = text_color;
						this.setData('color', text_color);
				}
				if( columns ){
					this.element.columns = columns;
					this.setData('columns', columns);
				}
			},

			data: function() {

				if( this.data.backgroundImage ){
					this.element.$.children[0].setAttribute('style', 'background-image:url(' + this.data.backgroundImage + ');');
				}
				if( this.data.backgroundPositionY ){
					this.element.$.children[0].style.backgroundPositionY = this.data.backgroundPositionY;
				}
        if( this.data.background_attachment ){
          this.element.$.children[0].style.backgroundAttachment = this.data.background_attachment;
        }
				if( this.data.opacity ){
					this.element.$.children[0].style.opacity = this.data.opacity;

				}
				if( this.data.overlayColor ){
					this.element.$.children[1].style.backgroundColor = this.data.overlayColor;

				}
				if( this.data.overlayOpacity ){
					this.element.$.children[1].style.opacity = this.data.overlayOpacity;

				}

				this.element.removeClass('one-col');
				this.element.removeClass('two-col');
				this.element.removeClass('three-col');
				this.element.removeClass('four-col');
				if( this.data.columns ) {
					this.element.addClass( this.data.columns );
				}

        this.element.removeClass('text-black');
        this.element.removeClass('text-white');
        if( this.data.color ) {
          this.element.addClass( this.data.color );
        }
      }});

		editor.ui.addButton('section',{
			label:'Section',
			command:'section',
			toolbar:''
		});
		CKEDITOR.dialog.add( 'section', this.path + 'dialogs/section.js' );
	}
});

