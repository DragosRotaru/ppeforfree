import React from "react";
import moment from "moment";
import {Row, Col, Typography} from "antd";
import {DetailModal} from "src/components/modal/GroupDetailModal";
import {InitiativeTable} from "src/components/table/InitiativeTable";
import {INITIATIVE_TABLE_COLUMNS} from "src/components/table/InitiativeTableColumns";
import data from "src/latest.json";
import "./style.css";
import {Link} from "react-router-dom";

const {Title, Paragraph} = Typography;

const filter = (input: string) => {
  const MIN_LENGTH = 30;
  if (input === "Public") return undefined;
  if (input.length < MIN_LENGTH) return undefined;
  return input;
};

const shorten = (input?: string) => {
  const MAX_LENGTH = 100;
  if (!input) return "";
  if (input.length > MAX_LENGTH) return input.slice(0, MAX_LENGTH) + "...";
  return input;
};

const listItems = (items?: string[]) => {
  return items && items.join(". ");
};

export const InitiativeDirectory = () => (
  <>
    <Row className="normal-width margin-bottom" gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
      <Col>
        <Title level={1}>PPEForFree Initiative Directory</Title>
        <Paragraph>
          The table below is generated by scraping Facebook once a day. If you dont see an
          initiative, <Link to="/initiatives/submit">add it here</Link>.{" "}
          <strong>
            Please submit any and all initiatives, not just those on Facebook.
          </strong>
        </Paragraph>
      </Col>
    </Row>
    <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
      <Col>
        <InitiativeTable
          columns={INITIATIVE_TABLE_COLUMNS.filter((col) => col.display !== false)}
          data={data.map((entry) => ({
            ...entry,
            modal: (
              <DetailModal
                id={entry.id}
                name={entry.name}
                description={entry.description}
                locations={entry.locations}
                isPublic={entry.isPublic}
                foundedOn={entry.foundedOn}
                memberCount={entry.memberCount}
                memberCountIncreaseWeekly={entry.memberCountIncreaseWeekly}
                postCountIncreaseDaily={entry.postCountIncreaseDaily}
                postCountIncreaseMonthly={entry.postCountIncreaseMonthly}
              />
            ),
            description: filter(shorten(entry.description)),
            foundedOn: moment(entry.foundedOn).format("YYYY-MM-DD"),
            scrapedAt: moment(entry.scrapedAt).fromNow(),
            locations: listItems(entry.locations),
          }))}
        />
      </Col>
    </Row>
  </>
);
