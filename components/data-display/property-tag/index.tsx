import styles from './styles.module.scss';

import Chip from 'components/data-display/chip';

import { IconTypes } from 'components/flourishes/icon';

type Tag = {
  type: string;
  text: string;
  icon: IconTypes;
};

export const TagList: Tag[] = [
  {
    type: 'new',
    text: 'New space',
    icon: 'star'
  },
  {
    type: 'featured',
    text: 'Featured space',
    icon: 'house' // Temporary icon for now
  }
];

// Get a list of the tag types and export the type
const tagTypes = TagList.map((tag) => tag.type);
export type TPropertyTag = (typeof tagTypes)[number];

/* Types */
export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Text displayed on PropertyTag
   */
  type: TPropertyTag;
  /**
   * Classname to apply to the PropertyTag
   */
  className?: string;
}

/**
 * The PropertyTag component is a wrapper for the PropertyTag component that allows for a property tag to be displayed.
 */
export const PropertyTag: React.FC<Props> = ({
  type = 'new',
  className
}: Props) => {
  const getTag = (type: TPropertyTag) => {
    return TagList.find((tag) => tag.type === type) || TagList[0]; // Return 'new' by default if not found;
  };

  const tag = getTag(type);

  return (
    <div className={className}>
      <Chip text={tag.text} className={styles[`tag-${type}`]} icon={tag.icon} />
    </div>
  );
};

PropertyTag.displayName = 'PropertyTag';

export default PropertyTag;
