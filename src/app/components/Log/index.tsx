import * as Tabs from '@radix-ui/react-tabs';
import tabsStyles from './tabs.module.scss';
import logStyles from './log.module.scss';
import type { comment, log } from '@prisma/client';

export default function Log({
  log,
}: {
  log: (log & {
    comments: comment[];
  })[];
}) {
  const idToName = (id: string) => {
    return id
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
      .join(' ');
  };

  return (
    <Tabs.Root
      className={tabsStyles.root}
      defaultValue={`${log[0].observation_level}`}
    >
      <Tabs.List className={tabsStyles.list} aria-label='Manage your account'>
        {log?.map((entry) => (
          <Tabs.Trigger
            className={tabsStyles.trigger}
            value={`${entry.observation_level}`}
            key={entry.id}
          >
            {entry.observation_level === 0
              ? 'Lacking data'
              : `Observation Level ${entry.observation_level}`}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {log?.map((entry) => (
        <Tabs.Content
          className={tabsStyles.content}
          value={`${entry.observation_level}`}
          key={entry.id}
        >
          <article className={logStyles.text}>
              <p>{entry.text}</p>
          </article>
          {entry.comments.length !== 0 && (
            <aside className={logStyles.comments}>
              {entry.comments?.map((comment) => (
                <p className={logStyles[comment.sinner_id]} key={comment.id}>
                  → {comment.text}
                </p>
              ))}
            </aside>
          )}
          <footer className={logStyles.footer}>
            Written by {idToName(entry.sinner_id)}
          </footer>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
