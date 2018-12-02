import React, { Component } from "react";
import { HeaderTextStyle } from "../../components/HeaderStyles";
import { connect } from "react-redux";
import Link from "next/link";
import { editFile, deleteLog } from "../../store";

class Draft extends Component {
  state = {
    drafts: [],
    fileToEdit: {}
  };
  componentDidMount = () => {
    const { drafts } = this.props;
    this.setState({ drafts });
  };
  handleQuery = query => {
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
    console.log(draft);
    const { dispatch } = this.props;
    dispatch(editFile({ draft }));
  };
  handleDelete = draft => {
    const { dispatch } = this.props;
    dispatch(deleteLog({ draft }));
  };
  render() {
    return (
      <div>
        <HeaderTextStyle>Draft</HeaderTextStyle>
        <input
          type="text"
          value={this.state.query}
          onChange={e => this.handleQuery(e.target.value)}
        />
        <table>
          <tbody>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Shift Start</th>
              <th>Shift End</th>
              <th>Comments</th>
              <th>Edit Log</th>
              <th>Delete Log</th>
            </tr>
            {this.state.drafts &&
              this.state.drafts.map(draft => (
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
                    <Link href="/new">
                      <span onClick={() => this.handleDelete(draft)}>X</span>
                    </Link>
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

export default connect(mapStateToProps)(Draft);
