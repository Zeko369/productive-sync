interface Props {
  title: string;
  time: string;
  id: string;
}

const template = (props: Props): string => {
  const { id, title, time } = props;
  return `${title} - <b>${time}</b><br />${id}`;
};

export default template;
