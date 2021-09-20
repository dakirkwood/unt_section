// JavaScript Document
CKEDITOR.dialog.add( 'section', function( editor ) {
    return {
        title: 'Section Widget',
        minWidth: 200,
        minHeight: 100,
        contents: [
            {
                id: 'info',
                elements: [
                    {
						id: 'backgroundImage',
						type: 'text',
						label: 'Background Image URL',
						width: '150px',
						default: '/sites/default/files/default_images/widgetBG_default.jpg',
						setup: function( widget ) {
							this.setValue( widget.data.backgroundImage );
						},
						commit: function( widget ) {
							widget.setData( 'backgroundImage', this.getValue() );
						}
					},
					{
						id: 'backgroundPositionY',
						type: 'text',
						label: 'Vertical Position',
						width: '150px',
						default: '50%',
						setup: function( widget ) {
							this.setValue( widget.data.backgroundPositionY );
						},
						commit: function( widget ) {
							widget.setData( 'backgroundPositionY', this.getValue() );
						}
					},
					{
						id: 'opacity',
						type: 'text',
						label: 'Opacity',
						width: '150px',
						default: '.2',
						setup: function( widget ) {
							this.setValue( widget.data.opacity );
						},
						commit: function( widget ) {
							widget.setData( 'opacity', this.getValue() );
						}
					}/*,
					{
						id: 'backgroundColor',
						type: 'text',
						label: 'Background Color',
						width: '150px',
						'default': '#FFF',
						setup: function( widget ) {
							this.setValue( widget.data.backgroundColor );
						},
						commit: function( widget ) {
							widget.setData( 'backgroundColor', this.getValue() );
						}
					}*/
					
                ]
			}
		]
	};
});
     