import styled from "styled-components";
import { useSubmissionContext } from "../../providers/submission-provider";
import { SubmissionItem } from "../submission/submission";
import { FC } from "react";

const ListOfSubmissions = styled.ul`
  width: 100%;
  height: 100%;

  margin: 0;
  padding: 0;
`;
/**
 *  Renders a list of Hacker News submisisons (Story, Ask, Poll, Job)
 */
export const SubmissionList: FC = () => {
  const {
    submissionIds,
    selectSubmissionType,
    selectSubmissionTitle,
    selectSubmissionAuthor,
    selectSubmissionScore,
    selectSubmissionTime,
    selectSubmissionUrl,
    selectSubmissionDescendants,
    selectSubmissionKids,
  } = useSubmissionContext();
  return (
    <ListOfSubmissions>
      {submissionIds.map((id) => {
        const type = selectSubmissionType(id);
        const title = selectSubmissionTitle(id);
        const by = selectSubmissionAuthor(id);
        const score = selectSubmissionScore(id);
        const time = selectSubmissionTime(id);
        const url = selectSubmissionUrl(id);
        const descendants = selectSubmissionDescendants(id);
        const kids = selectSubmissionKids(id);

        return (
          <SubmissionItem
            id={id}
            type={type!}
            key={id}
            title={title}
            by={by}
            score={score}
            time={time}
            url={url}
            descendants={descendants}
            kids={kids}
          />
        );
      })}
    </ListOfSubmissions>
  );
};
