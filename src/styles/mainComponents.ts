import { inherits } from "util";

const APP_TOP_HEIGHT : number = 80;
const APP_TOP_HORIZONTAL_PADDING : number = 5;
export const AppBodyStyleProps: any = {
  width: 'calc(100% - 20px)',
  padding: '0 10px',
  height: 'calc(100vh)',
  overflowY: 'auto',
};
export const PageTopStyleProps: any = {
  position: 'absolute',
  top: 0,
  opacity: 0.99,
  height: APP_TOP_HEIGHT,
  zIndex: '200',
  paddingTop: APP_TOP_HORIZONTAL_PADDING,
  paddingBottom: APP_TOP_HORIZONTAL_PADDING,
  marginBottom: 20,
  width: '100%',
  background: 'inherit',
};
export const ContentStyle: any = {
  top: APP_TOP_HEIGHT,
  width: '100%',
  maxWidth: 1200,
  zIndex: 0,
  position: 'relative',
};
export const ArtistOverviewStyleProps: any = {
  position: 'absolute',
  top: 0,
  zIndex: 0,
  overflow: 'visible',
};
export const AlbumBrowserStyleProps: any = {
  position: 'relative',
  top: 0,
  zIndex: 100,
  overflow: 'visible',
};

export const AlbumOverviewStyleProps: any = {
  position: 'fixed',
  top: 0,
  zIndex: '9999',
  width: '100%',
  height: '100vh',
};