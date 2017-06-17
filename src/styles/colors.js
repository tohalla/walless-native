const colors = {
	alizarin: '#e74c3c',
	ebonyClay: '#22313F',
	madison: '#2C3E50',
	bluewood: '#34495E',
	white: '#FFFFFF',
	carrara: '#F2F1EF',
	gallery: '#EEEEEE',
	iron: '#DADFE1',
  river: '#3498db',
	lightGray: '#9E9E9E',
	gray: '#424242',
	darkGray: '#212121',
	black: '#000'
};

export default Object.assign({
	background: colors.alizarin,
	foreground: colors.carrara,
  foregroundDark: colors.darkGray,
  headerBackground: colors.alizarin,
  headerForeground: colors.carrara,
  link: colors.river
}, colors);
