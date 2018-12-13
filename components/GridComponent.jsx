import React, { Component } from "react";
import { HeaderTextStyle } from "./HeaderStyles";
import { connect } from "react-redux";
import Link from "next/link";
import { editFile, deleteLog } from "../store";

class Grid extends Component {
  state = {
    query: "",
    drafts: [],
    deleting: false,
    fileToEdit: {}
  };
  componentDidMount = () => {
    const { drafts, deleting } = this.props;
    this.setState({ drafts, deleting });
  };

  componentWillReceiveProps = props => {
    this.setState({
      drafts: props.drafts,
      deleting: false
    });
  };
  handleQuery = query => {
    this.setState({ query });
    const draftsCopy = [];
    const { drafts } = this.props;
    if (query === "") {
      this.setState({ drafts });
    } else {
      this.props.drafts.map(draft => {
        if (draft.title.toLowerCase().includes(query.toLowerCase())) {
          draftsCopy.push(draft);
        }
      });
      this.setState({
        drafts: draftsCopy
      });
    }
  };
  handleEdit = draft => {
    const { dispatch } = this.props;
    dispatch(editFile({ draft }));
  };
  handleDelete = draft => {
    const { dispatch } = this.props;
    const response = confirm("Are you sure you want to delete this log?");
    if (response) {
      this.setState({ deleting: !this.state.deleting });
      dispatch(deleteLog({ draft }));
    }
  };
  render() {
    const { query, drafts } = this.state;
    return (
      <div className="drafts">
        <HeaderTextStyle>{this.props.type}</HeaderTextStyle>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            value={query}
            onChange={e => this.handleQuery(e.target.value)}
            placeholder={
              drafts.length > 0
                ? "Search previous logs..."
                : "Nothing to search!"
            }
          />
        </div>

        <table className="table">
          <tbody>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Date</th>
              <th scope="col">Shift Start</th>
              <th scope="col">Shift End</th>
              <th scope="col">Comments</th>
              <th scope="col">Edit Log</th>
              <th scope="col">Delete Log</th>
            </tr>
            {drafts &&
              drafts.map(draft => (
                <tr key={draft.logId}>
                  <td>{draft.title}</td>
                  <td>{draft.date}</td>
                  <td>{draft.shiftStart}</td>
                  <td>{draft.shiftEnd}</td>
                  <td>{draft.comments}</td>
                  <td>
                    <Link
                      href={{
                        pathname: "/new",
                        query: { log: `${draft.logId}` }
                      }}>
                      <span onClick={() => this.handleEdit(draft)}>✏️</span>
                    </Link>
                  </td>
                  <td>
                    {!this.state.deleting ? (
                      <span onClick={() => this.handleDelete(draft)}>X</span>
                    ) : (
                      <p>Deleting...</p>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { drafts } = state;
  return { drafts };
};

export default connect(mapStateToProps)(Grid);
