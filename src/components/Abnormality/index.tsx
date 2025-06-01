'use client';

import * as Dialog from '@radix-ui/react-dialog';
import abnormalityStyles from './abnormality.module.scss';
import dialogStyles from './dialog.module.scss';
import Log from './Log';
import type {
  abnormalities as AbnormalitiesType,
  logs as LogsType,
  comments as CommentsType,
} from '@prisma/client';

export type AbnormalityProps = AbnormalitiesType & {
  logs: (LogsType & {
    comments: CommentsType[];
  })[];
};

export default function Abnormality({
  abnormality,
}: {
  abnormality: AbnormalityProps;
}) {
  const {name, classCode, image, riskLevel, logs} = abnormality;
  
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <figure className={abnormalityStyles.abnormality}>
          <div className={abnormalityStyles['image-container']}>
            <img
              src={
                abnormality.image
                  ? `https://raw.githubusercontent.com/retcons/limbus-logs/main/images/${image}`
                  : 'https://raw.githubusercontent.com/retcons/limbus-logs/main/images/placeholder.svg'
              }
              alt={name ?? 'Unknown abnormality'}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  'https://raw.githubusercontent.com/retcons/limbus-logs/main/images/placeholder.svg';
              }}
            />
          </div>
          <figcaption className={abnormalityStyles.footer}>
            <div className={abnormalityStyles.wrapper}>
              <h3 className={abnormalityStyles['class-code']}>
                {classCode ?? 'UNDEF.'}
              </h3>
              <img
                className={abnormalityStyles['risk-level']}
                src={`https://raw.githubusercontent.com/retcons/limbus-logs/main/images/risk_level/${riskLevel}.png ?? 'https://raw.githubusercontent.com/retcons/limbus-logs/main/images/risk_level/UNKNOWN.png'`}
                alt={`Risk level of ${riskLevel ?? 'UNKNOWN'}`}
              />
            </div>
            <p className={abnormalityStyles.name}>{name ?? "Unknown Abnormality"}</p>
          </figcaption>
        </figure>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={dialogStyles.overlay}>
          <Dialog.Content
            className={dialogStyles.content}
            aria-describedby={`${name}-info`}
          >
            <Dialog.Title className={dialogStyles.title}>
              {name ?? "Unknown Abnormality"}
            </Dialog.Title>
            <Dialog.Description asChild>
              {abnormality?.logs.length > 0 ? (
                <Log logs={logs} />
              ) : (
                <span>No logs found</span>
              )}
            </Dialog.Description>
            <Dialog.Close asChild>
              <button className={dialogStyles.close} aria-label='close modal'>
                Close
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
