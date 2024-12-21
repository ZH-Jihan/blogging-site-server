import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // Search
  search(searcingFields: string[]) {
    const searchTerm = this?.query?.search;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searcingFields.map(
          field =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  // Filter by field name and value
  filter() {
    const queryObj = { ...this.query }; // copy

    // Exclude fields from query. if query is not filtered by field name and value in the model query
    const excludeFields = [
      'search',
      'sortBy',
      'sortOrder',
      'limit',
      'page',
      'fields',
    ];
    // delete Excluded fields from query object
    excludeFields.forEach(el => delete queryObj[el]);

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  sortBy() {
    // Get the sortBy field from the query or default to 'createdAt'
    const sort =
      (this?.query?.sortBy as string)?.split(',')?.join(' ') || 'createdAt';

    // Handle sortOrder if it is provided
    const sortOrder = this?.query?.sortOrder === 'desc' ? '-' : ''; // Default to descending if no order is provided

    this.modelQuery = this.modelQuery.sort(sortOrder + sort);

    return this;
  }

  // Pagination logic using Mongoose's skip and limit methods
  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  // Limit the fields returned by the query. Mongoose's select method is used for this.
  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;
