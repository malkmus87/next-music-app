const APP_TOP_HEIGHT : number = 50;
const APP_TOP_HORIZONTAL_PADDING : number = 5;
export const AppBodyStyleProps: any = {
  width: 'calc(100% - 20px)',
  padding: '0 10px',
  height: 'calc(100vh)',
  overflowY: 'auto',
};
export const PageTopStyleProps: any = {
  position: 'relative',
  height: APP_TOP_HEIGHT,
  zIndex: '200',
  paddingTop: APP_TOP_HORIZONTAL_PADDING,
  paddingBottom: APP_TOP_HORIZONTAL_PADDING,
  marginBottom: 20,
  width: '100%',
};
export const ArtistOverviewStyleProps: any = {
  position: 'relative',
  zIndex: '0',
  width: '100%',
};
export const AlbumOverviewStyleProps: any = {
  position: 'fixed',
  // top: APP_TOP_HEIGHT + APP_TOP_HORIZONTAL_PADDING * 2,
  top: 0,
  zIndex: '9999',
  width: '100%',
  height: '100vh',
};
