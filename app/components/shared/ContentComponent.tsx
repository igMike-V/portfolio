import React, { type ReactElement } from 'react';

export type ContentNode = {
  url: any;
  type: string;
  text: string;
  children: ContentNode[] | string;
}

type Props = {
  content: ContentNode[];
}

function escapeHTML(text: string) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

const ContentComponent: React.FunctionComponent<Props> = ({ content }: Props): ReactElement => {
  const serialize = (node: ContentNode | string, index: number): ReactElement => {
    if (typeof node === 'string') {
      return <span dangerouslySetInnerHTML={{ __html: escapeHTML(node) }} key={index} />;
    }
    if(node.text){
      return <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} key={index} />;
    }

    if (!node) {
      return <></>;
    }

    const headingStyles = {
      h1: 'text-3xl',
      h2: 'text-2xl',
      h3: 'text-xl',
      h4: 'text-lg',
      h5: 'text-base',
      h6: 'text-base',
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

    return <div key={index}>{Array.isArray(node.children) && node.children.map(serialize)}</div>;
  };
  

  return <>{Array.isArray(content) && content.map((node, index) => serialize(node, index))}</>;
};

export default ContentComponent;
