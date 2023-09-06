export const TableSection = ({ sectionName }) => (
  <th>
    <span className="is-flex is-flex-wrap-nowrap">
      {sectionName}

      <a href="#/">
        <span className="icon">
          <i data-cy="SortIcon" className="fas fa-sort" />
        </span>
      </a>
    </span>
  </th>
);
