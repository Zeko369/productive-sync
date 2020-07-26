interface Props {
  title: string;
  time: string;
  id: string;
}

const template = (props: Props): string => {
  const { id, title, time } = props;
  return `<b>${time}</b><br />${title}<br />#${id}#`;
};

export default template;
