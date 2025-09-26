import React from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';
import Link from 'components/data-display/link';
import { Icon } from 'components/flourishes/icon';

import { humanFileSize } from 'lib/helpers/human-file-size';

const cx = classNames.bind(styles);

export interface Props extends React.ComponentProps<'div'> {
  /**
   * The path to the file to download
   */
  filePath: string;
  /**
   * The file's friendly name
   */
  name: string;
  /**
   * The file size in bytes
   */
  fileSize?: number;
}

/**
 * The FileDownload component is used to provide a link to download a file.
 * It displays the name, an icon, and a link to download the file.
 * It calculates the file size and displays it in the link.
 *
 * **NOTE**: At the moment, this component only supports PDF files.
 */
export const FileDownload: React.FC<Props> = ({
  filePath,
  name,
  fileSize,
  className,
  ...props
}: Props) => {
  return (
    <div className={cx(styles['file-download'], className)} {...props}>
      <Link href={filePath || ''} className={styles['link']}>
        <Icon use="docdownload" className={styles['icon']} />
        <span className={styles['file-info']}>
          <span className={styles['name']}>{name}</span>
          {fileSize && <span>({humanFileSize(fileSize)}) (pdf)</span>}
        </span>
      </Link>
    </div>
  );
};

export default FileDownload;
