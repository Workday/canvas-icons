'use client';

import {capitalCase} from 'change-case-all';
import * as React from 'react';

import {Table} from '@workday/canvas-kit-react/table';
import * as systemIcons from '@workday/canvas-system-icons-web';
import {system} from '@workday/canvas-tokens-web';
import {CanvasSystemIcon} from '@workday/design-assets-types';

type SystemIconEntry = CanvasSystemIcon & {fallback?: string};
const iconMap = systemIcons as unknown as Record<string, SystemIconEntry>;

export const SystemIconsList = ({
  category,
  deprecated = false,
}: {
  category?: string;
  deprecated?: boolean;
}) => {
  const icons = Object.keys(systemIcons).filter(
    i =>
      i.endsWith('Icon') &&
      (!category || iconMap[i].category === category) &&
      deprecated === !!iconMap[i].fallback
  );

  const rowStyles = `${system.space.x20} repeat(4, minmax(min-content, 1fr))`;

  return (
    <Table>
      <Table.Head>
        <Table.Row cs={{gridTemplateColumns: rowStyles}}>
          <Table.Header scope="col">Icon</Table.Header>
          <Table.Header scope="col">Name{deprecated && ' (Replacement)'}</Table.Header>
          <Table.Header scope="col">JS Name</Table.Header>
          <Table.Header scope="col">Filename</Table.Header>
          <Table.Header scope="col">Category</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {icons.map(icon => {
          const {name = '', svg, category, filename, fallback = ''} = iconMap[icon];

          return (
            <Table.Row key={name} cs={{gridTemplateColumns: rowStyles}}>
              <Table.Cell>
                <div dangerouslySetInnerHTML={{__html: svg}} />
              </Table.Cell>
              <Table.Cell>
                {capitalCase(name)}
                {deprecated && ` (${capitalCase(fallback)})`}
              </Table.Cell>
              <Table.Cell>{<code>{icon}</code>}</Table.Cell>
              <Table.Cell>{<code>{filename}</code>}</Table.Cell>
              <Table.Cell>{category}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};
