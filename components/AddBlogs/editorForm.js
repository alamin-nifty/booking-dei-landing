import React, { useState } from "react";
import { FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Button";
import Typography from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { makeStyles } from "tss-react/mui";
import CssBaseline from "@mui/material/CssBaseline";
const EditorForm = (props) => {
  const { imgUrl, tags, title, setTitle, setTags, setImgUrl } = props;
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const useEditorFormStyles = makeStyles({ uniqId: "editor-form" })(
    (theme) => ({
      form: {
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(1),
        alignItems: "center",
        justifyContent: "center",
      },
      labelHeader: {
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(0),
        alignItems: "start",
        fontSize: "1rem",
        color: "black",
      },
      label: {
        width: "400px",
        height: "60px",
        margin: theme.spacing(1, 0, 0, 0),
        fontSize: "1.5rem",
      },

      uploadArea: {
        border: "1px dashed #ccc",
        padding: "10px",

        cursor: "pointer",
        marginTop: "20px",
        borderRadius: "5px",
        backgroundColor: "#fafafa", // Light grey background
      },

      uploadIcon: {
        marginRight: "10px",
      },
      input: {
        '&[type="file"]': {
          display: "none",
        },
      },
      placeholderText: {
        pointerEvents: "none",
        color: "#999",
      },
    })
  );
  const { classes } = useEditorFormStyles();

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("image", file);

      const imgBBApiKey = "e4ffcc08c6b308513aae20ba7cb73297";
      try {
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgBBApiKey}`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        if (data.data && data.data.url) {
          setImgUrl(data.data.url);
          setIsUploadComplete(true);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };
  // const handleTagsChange = (e) => setTags(e.target.value);

  // Add more tag options here

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div>
        <Container maxWidth="lg">
          <FormControl component="form" onSubmit={handleSubmit}>
            <div className={classes.labelHeader}>
              <label>Title:</label>
              <input
                label="Title"
                type="text"
                value={title}
                onChange={handleTitleChange}
                className={classes.label}
                required
              />
            </div>

            <div className={classes.label}>
              <Paper
                variant="outlined"
                className={classes.uploadArea}
                onClick={() => document.getElementById("file-input").click()}
              >
                <Typography
                  variant="body1"
                  style={{
                    color: isUploadComplete ? "green" : "gray",
                    width: "380px",
                  }}
                  className={classes.placeholderText}
                  startIcon={<CloudUploadIcon className={classes.uploadIcon} />}
                >
                  {isUploading
                    ? "Uploading..."
                    : imgUrl
                      ? "Image uploaded!"
                      : "Select title image"}
                </Typography>
                {/* <Button className={classes.uploadButton}>Upload Image</Button> */}
                <input
                  accept="image/*"
                  className={classes.input}
                  id="file-input"
                  type="file"
                  onChange={handleImageUpload}
                />
              </Paper>
            </div>
            {/* <div className={classes.label}>
              <TextField
                label="Tags"
                select
                onChange={handleTagsChange}
                value={tags}
                className={classes.input}
              >
                {tagOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div> */}
          </FormControl>
        </Container>
      </div>
    </>
  );
};

export default EditorForm;
