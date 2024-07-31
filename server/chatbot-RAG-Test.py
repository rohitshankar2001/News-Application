import chromadb
from langchain_chroma import Chroma
from langchain_community.document_loaders import TextLoader
from langchain_community.embeddings.sentence_transformer import (
    SentenceTransformerEmbeddings,
)
from langchain_text_splitters import CharacterTextSplitter
from dotenv import load_dotenv
from langchain_huggingface import HuggingFaceEndpoint



load_dotenv()


embedding_function = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
persistent_client = chromadb.PersistentClient()
collection = persistent_client.get_or_create_collection("collection_name")
collection.add(ids=["1", "2", "3"], documents=["The USA was created in 1776", "b", "c"])

langchain_chroma = Chroma(
    client=persistent_client,
    collection_name="collection_name",
    embedding_function=embedding_function,
)


print("There are", langchain_chroma._collection.count(), "in the collection")

query = "when was the usa created?"
#print(query)
docs = langchain_chroma.similarity_search(query)
# print(docs[0].page_content)

from langchain import hub

llm = HuggingFaceEndpoint(repo_id = "mistralai/Mistral-7B-Instruct-v0.3")
prompt = hub.pull("rlm/rag-prompt")

example_messages = prompt.invoke(
    {"context": "The USA was created in july 4th 1776", "question": "When was the USA created?"}
).to_messages()

print(example_messages)
print(llm.invoke(example_messages))

