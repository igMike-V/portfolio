import React, { createElement, type ReactElement } from 'react';
import type { 
  SerializedLexicalNode,
  LexicalRootNode
} from '~/types';

type Props = {
  content: LexicalRootNode;
}

function escapeHTML(text: string) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

const headingStyles = {
  h1: 'text-3xl',
  h2: 'text-2xl',
  h3: 'text-xl',
  h4: 'text-lg',
  h5: 'text-base',
  h6: 'text-base',
}


const ContentComponent: React.FunctionComponent<Props> = ({ content }: Props): ReactElement => {
  
  const serialize = (node: SerializedLexicalNode | string, index: number): ReactElement => {

    // Deal with text nodes.
    if (typeof node === 'string') {
      return <span dangerouslySetInnerHTML={{ __html: escapeHTML(node) }} key={index} />;
    }

    switch (node.type) {
      case 'root':
        return <section key={index}>{Array.isArray(node.children) && node.children.map(serialize)}</section>;
      case 'heading':
        if(node.tag === 'h1') {
          return <h1 className='font-heading text-3xl' key={index}>{Array.isArray(node.children) && node.children.map(serialize)}</h1>;
        } else if(node.tag === 'h2') {
          return <h2 className='font-heading text-2xl' key={index}>{Array.isArray(node.children) && node.children.map(serialize)}</h2>;
        } else if(node.tag === 'h2') {
          return <h3 className='font-heading text-xl' key={index}>{Array.isArray(node.children) && node.children.map(serialize)}</h3>;
        } else if(node.tag === 'h2') {
          return <h4 className='font-heading text-lg' key={index}>{Array.isArray(node.children) && node.children.map(serialize)}</h4>;
        } else if(node.tag === 'h5') {
          return <h5 className='font-heading text-base' key={index}>{Array.isArray(node.children) && node.children.map(serialize)}</h5>;
        } else if(node.tag === 'h6') {
          return <h6 className='font-heading text-base' key={index}>{Array.isArray(node.children) && node.children.map(serialize)}</h6>;
        }
        return <p className='text-lg key={index}'>{Array.isArray(node.children) && node.children.map(serialize)}</p>;
      case 'paragraph':
        return <p className={`text-lg pl-${node.indent} font-text` } key={index}>{Array.isArray(node.children) && node.children.map(serialize)}</p>;
      case 'list':
        if( node.tag === 'ul' ) {
          return <ul className='pl-3 font-text' key={index}>{Array.isArray(node.children) && node.children.map(serialize)}</ul>;
        }
        return <ol className='pl-3 font-text' key={index}>{Array.isArray(node.children) && node.children.map(serialize)}</ol>;
      case 'listitem':
        return <li key={index}>{Array.isArray(node.children) && node.children.map(serialize)}</li>;
      case 'text':
        return <span key={index}>{node.text}</span>;  
    }
    
    /* 

    if (!node) {
      console.log('NOTHING!!!')
      return <></>;
    }
    console.log('node', node.type )

   
    if (node.type === 'heading') {
      console.log('heading', node)
      //return <p className='text-lg' key={index}>{Array.isArray(node.children) && node.children.map(serialize)}</p>;
    }

    if (node.type === 'h1' || node.type === 'h2' || node.type === 'h3' || node.type === 'h4' || node.type === 'h5' || node.type === 'h6') {
      const HeadingComponent = node.type;
      return <HeadingComponent className={`font-heading ${headingStyles[node.type]}`} key={index}>{Array.isArray(node.children) && node.children.map(serialize)}</HeadingComponent>;
    }

    if (node.type === 'ul') {
      return <ul className='pl-3' key={index}>{Array.isArray(node.children) && node.children.map(serialize)}</ul>;
    }

    if (node.type === 'ol') {
      return <ol key={index}>{Array.isArray(node.children) && node.children.map(serialize)}</ol>;
    }

    if (node.type === 'li') {
      return <li key={index}>{Array.isArray(node.children) && node.children.map(serialize)}</li>;
    }

    if (node.type === 'link') {
      const url = typeof node.url === 'string' ? escapeHTML(node.url) : '';
      return (
        <a href={url} key={index}>
          {Array.isArray(node.children) && node.children.map(serialize)}
        </a>
      );
    }
    if (node.type === 'root') {
      console.log('root')
      return (
        <section>
          {Array.isArray(node.children) && node.children.map(serialize)}      
        </section>
      )
    } */

    return <div key={index}>{Array.isArray(node.children) && node.children.map(serialize)}</div>;
  };

  console.log('content', content)
  return <>{content.hasOwnProperty('children') && content.children?.map((node, index) => {
    return serialize(node, index)
  })}</>;
};

export default ContentComponent;
