import * as React from 'react';
import { FunctionComponent, useReducer } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { CenteredComponent } from 'components/_general';

interface PropsType {
  summary: string;
  content: string;
  style?: any;
}

function renderStateReducer(state:any, action:any) {
  switch (action.type) {
    case 'toggleView':
      return state === 'expanded' ? 'mounted' : 'expanded';
    default:
      return action.value;
  }
}

function assembleText(text: string) : any {
  function assembleTextReducer(accumulatedElements:Array<any>, currentValue: any) {
    const lastGeneratedText = accumulatedElements.length === 0 ? '\n' : accumulatedElements[accumulatedElements.length - 1].text;
    const isProbablyHeader = lastGeneratedText === '' && currentValue.length < 100;
    return ([...accumulatedElements, {
      text: currentValue,
      component: <p style={{ marginBottom: 5, ...isProbablyHeader ? { color: 'coral' } : {} }}>{currentValue}</p>,
    }]);
  }
  return text !== undefined ? text.split('\n').reduce(assembleTextReducer, []).map((element) => element.component) : [];
}
const Biography:FunctionComponent<PropsType> = ({
  summary, content, style,
}:PropsType) => {
  const [renderState, setRenderState] = useReducer(renderStateReducer, 'mounted');

  return (
    <div style={style}>
      <div>
        {renderState === 'expanded' && assembleText(content)}
        {renderState === 'mounted' && assembleText(summary)}
      </div>
      <CenteredComponent style={{ cursor: 'pointer' }} onClick={() => setRenderState({ type: 'toggleView' })}>
        {renderState === 'expanded' && <ExpandLessIcon />}
        {renderState === 'mounted' && <ExpandMoreIcon />}
      </CenteredComponent>
    </div>
  );
};

Biography.defaultProps = {
  style: { },
};

export default Biography;
